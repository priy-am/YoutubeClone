import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom"
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
import { FaShare } from "react-icons/fa";
import { GiSaveArrow } from "react-icons/gi";
import { IoMdCut } from "react-icons/io";
import { BiSave } from "react-icons/bi";
import VideoRandor from "./VideoRandor";
import { IoIosArrowDown } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import { IoSend } from "react-icons/io5";
import LiveCharat from "./LiveCharat";
import { setMessage } from "../app/chatSlice";

const Watch = () => {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.app.open);
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get('v');
  const [singleVideo, setSingleVideo] = useState([]);
  const API_KEY = import.meta.env.VITE_API_KEY;
  const YOUTUBE_VIDEO_API = import.meta.env.VITE_YOUTUBE_VIDEO_API;
  const [isFullContent, setIsFullContent] = useState(false);
  const [like, setlike] = useState(false)
  const [dislike, setdislike] = useState(false)
  const [visible, setvisible] = useState(false)
  const [input, setinput] = useState("")

  function timeAgoConverter(dateString) {
    const date = new Date(dateString);

    const now = new Date();
    const diff = now - date;

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (seconds < 60) {
      return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
    } else if (minutes < 60) {
      return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    } else if (hours < 24) {
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else if (days < 7) {
      return `${days} day${days !== 1 ? 's' : ''} ago`;
    } else if (weeks < 4) {
      return `${weeks} week${weeks !== 1 ? 's' : ''} ago`;
    } else if (months < 12) {
      return `${months} month${months !== 1 ? 's' : ''} ago`;
    } else {
      return `${years} year${years !== 1 ? 's' : ''} ago`;
    }
  }

  function viewConverter(views) {
    if (views < 1000) {
      return views;
    } else if (views < 1000000) {
      return (views / 1000).toFixed(1) + 'K';
    } else {
      return (views / 1000000).toFixed(1) + 'M';
    }
  }

  const toggleContent = () => {
    setIsFullContent(!isFullContent);
  };

  const sendMessage = ()=>{
    dispatch(setMessage({
      name:"priyam",
      message:input
    }))
    setinput("")
  }

  const getsingleVideo = async () => {
    try {
      const res = await fetch(`${YOUTUBE_VIDEO_API}?key=${API_KEY}&part=snippet,contentDetails,statistics&id=${videoId}`);
      const data = await res.json();
      setSingleVideo(data.items[0])
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getsingleVideo()
  }, [])

  return (
    <div className={`${open ? "w-[85%]" : "w-[calc(100vw-5rem)]"} absolute right-0 top-16 bg-black text-white px-5 flex`}>
      <div className="left w-[80%]">
        <iframe
          width="860"
          height="515"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen>
        </iframe>

        <div className="mt-5">
          <VideoRandor />
        </div>

      </div>
      <div className="right text-white ml-7 mt-5">

        <div className="upper">
          <div className="title text-xl font-bold">{singleVideo?.snippet?.title}</div>
          <span className="views font-medium  pr-4">{viewConverter(singleVideo?.statistics?.viewCount)} views</span>
          <span className="time font-medium ">{timeAgoConverter(singleVideo?.snippet?.publishedAt)}</span>
          <div className="discription max-w-xs text-gray-300 my-4">
            <div className={`cursor-pointer overflow-hidden ${isFullContent ? 'whitespace-normal' : 'whitespace-nowrap overflow-hidden'}`} onClick={toggleContent}>
              {isFullContent ? (
                <div>
                  {singleVideo?.snippet?.description}
                </div>
              ) : (
                <div className="truncate">
                  {singleVideo?.snippet?.description}  <span className="text-blue-400"> see more.</span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="prifile flex items-center justify-between">
          <div className="left flex items-center">
            <img className="rounded-full p-3 w-12 h-12" src="https://yt3.ggpht.com/9p-HY1sL3EiO8zRz-NNwl43h55DDTa2Oi-O9ZuRABG06kixfAg08FiSQAbQOko1O6NF6rrVN_Mw=s68-c-k-c0x00ffffff-no-rj" alt="user-profile" />
            <div className="channelName font-bold text-lg">{singleVideo?.snippet?.channelTitle}</div>
          </div>
          <div className="right">
            <button className="rounded-3xl font-semibold bg-white text-black px-3 py-2">Subscribe</button>
          </div>
        </div>

        <div className="lkeCount flex gap-2 items-center justify-evenly my-2">
          <div onClick={() => { setlike(!like); setdislike(false) }} className="flex cursor-pointer rounded-full p-3 hover:bg-gray-700 bg-gray-800 items-center gap-2">
            <div className="likeicon ">{!like ? <AiOutlineLike /> : <AiFillLike />}</div>
            <span>{viewConverter(singleVideo?.statistics?.likeCount)}</span>
          </div>
          <div onClick={() => { setdislike(!dislike); setlike(false) }} className="like cursor-pointer rounded-full p-3 hover:bg-gray-700 bg-gray-800">{!dislike ? <AiOutlineDislike /> : <AiFillDislike />}</div>
          <div className="share rounded-full p-3 hover:bg-gray-700 bg-gray-800"><FaShare /></div>
          <div className="download rounded-full p-3 hover:bg-gray-700 bg-gray-800"><GiSaveArrow /></div>
          <div className="clip rounded-full p-3 hover:bg-gray-700 bg-gray-800"><IoMdCut /></div>
          <div className="clip rounded-full p-3 hover:bg-gray-700 bg-gray-800"><BiSave /></div>
        </div>

        <div className="liveChart border rounded-md  my-5">
          <div className="top flex border-b p-4 justify-between ">
            <div className="left flex items-center gap-1">
              <h1>Top Chat</h1>
              <span><IoIosArrowDown/></span>
            </div>
            <div className="right flex items-center gap-4">
              <span><BsThreeDotsVertical/></span>
              <span onClick={()=>setvisible(!visible)} className="cursor-pointer"><RxCross1/></span>
            </div>
            
          </div>
          <div className={`medium flex flex-col-reverse h-60 overflow-y-auto px-4 ${visible?"hidden":""}`}>
            <LiveCharat/>
          </div>
          <div className={`${visible?"hidden":""} bottom flex items-center justify-between text-gray-200  p-3 relative border-t`}>
            <input value={input} onChange={(e)=>setinput(e.target.value)} className="bg-[#3e3e3e] p-2 px-6 rounded-full w-full" type="text" placeholder="Chat..." />
            <span onClick={sendMessage} className="absolute right-8 cursor-pointer"><IoSend/></span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Watch;
