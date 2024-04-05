import React, {useState, useEffect } from 'react'

function viewConverter(views) {
    if (views < 1000) {
        return views;
    } else if (views < 1000000) {
        return (views / 1000).toFixed(1) + 'K';
    } else {
        return (views / 1000000).toFixed(1) + 'M';
    }
}

//month know
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

function convertTimeString(timeString) {
    if (!timeString) return "";
    // Extract minutes and seconds from the timeString
    const minutes = parseInt(timeString.match(/(\d+)M/)?.[1] || 0, 10);
    const seconds = parseInt(timeString.match(/(\d+)S/)?.[1] || 0, 10);

    // Calculate total seconds
    const totalSeconds = minutes * 60 + seconds;

    // Calculate hours and remaining minutes
    const hours = Math.floor(totalSeconds / 3600);
    const remainingMinutes = Math.floor((totalSeconds % 3600) / 60);
    const remainingSeconds = totalSeconds % 60;

    // Format the time
    const formattedTime = `${hours * 60 + remainingMinutes}:${remainingSeconds.toString().padStart(2, '0')}`;

    return formattedTime;
}



const VideoCart = ({item}) => {
    const [vidData, setvidData] = useState([])
    const [profile, setprofile] = useState('')
    const apikey = import.meta.env.VITE_API_KEY;
    const getYoutubeChannelName = async()=>{
        try {
            const res = await fetch(`https://www.googleapis.com/youtube/v3/channels?key=${apikey}&part=snippet,contentDetails,statistics&id=${item.snippet.channelId}`)
            const data = await res.json();
            setvidData(data.items[0])
            setprofile(data.items[0].snippet.thumbnails.default.url)
        } catch (error) {
            console.log(`ytchannelName fetching error: ${error}`)
        }
    }

    useEffect(() => {
        getYoutubeChannelName();
    }, [])
    
    return (
        <div className="card cursor-pointer">
            <div className="thumnail relative p-1 flex items-center justify-center">
                <img className=' rounded-md' src={item.snippet.thumbnails.medium.url} alt="thumnail" />
                {/* <span className='duration absolute right-3 bottom-2'>{convertTimeString(vidData?.contentDetails?.duration)}</span> */}
            </div>
            <div className="details flex">
                <img className="rounded-full p-3 w-12 h-12"
                    src={profile} alt="user-profile" />
                <div className="vid-detail">
                    <div className="title text-md font-bold">{item.snippet.title}</div>
                    <div className="channelTitle text-sm text-[#f1f1f1]">{item.snippet.channelTitle}</div>
                    <span className='views text-sm text-[#f1f1f1] pr-1'>{viewConverter(vidData?.statistics?.viewCount)} views •</span>
                    <span className='time text-sm text-[#f1f1f1]'>{timeAgoConverter(item.snippet.publishedAt)}</span>
                </div>
            </div>
        </div>
    )
}

export default VideoCart
