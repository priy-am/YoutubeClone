import React from 'react'
import {useEffect } from 'react'
import VideoCart from './VideoCart';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setHomevideo } from '../app/appSlice';


const VideoRandor = () => {
  const dispatch = useDispatch();
  const {video, category} = useSelector((store)=>store.app)

  const API_KEY = import.meta.env.VITE_API_KEY;
  const YOUTUBE_VIDEO_API = import.meta.env.VITE_YOUTUBE_VIDEO_API;
  const maxResults = import.meta.env.VITE_MAX_RESULTS;
  const regionCode = import.meta.env.VITE_REGION_CODE;

  const fetchingVideo = async () => {
    try {
      const res = await fetch(`${YOUTUBE_VIDEO_API}?key=${API_KEY}&part=snippet&chart=mostPopular&regionCode=${regionCode}&maxResults=${maxResults}`)
      const data = await res.json();
      dispatch(setHomevideo(data?.items))
    } catch (error) {
      console.log(`fetching video error: ${error}`);
    }

  }

const fetchingVideoByCatagory = async()=>{
  try {
    let res = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${maxResults}&q=${category}&type=video&key=${API_KEY}`)
    let data = await res.json()
    console.log(data)
    dispatch(setHomevideo(data?.items))
  } catch (error) {
    console.log(error)
  }
}

  useEffect(() => {
    if(category == "All"){
      fetchingVideo();
    }else{
      fetchingVideoByCatagory()
    }
  }, [category])


  return (
    <div className='grid grid-cols-3 gap-7 mt-4'>
      {
         video.map((item) => {
          return(
          <Link to={`/watch?v=${typeof item.id=== "object"? item.id.videoId: item.id}`} key={typeof item.id=== "object"? item.id.videoId: item.id}>
            <VideoCart  item={item} />
          </Link>
          )
        })
      }

    </div>
  )
}

export default VideoRandor
