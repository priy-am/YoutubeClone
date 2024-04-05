import React from 'react'
import Button from './Button'
import VideoRandor from './VideoRandor'
import { useSelector } from 'react-redux'

const Feed = () => {
  const open = useSelector((state) => state.app.open)
  return (
    <div className={`${open?"w-[85%]":"w-[calc(100vw-5rem)]"} absolute right-0 top-16 bg-black text-white px-5`}>
        <Button/>
        <VideoRandor/>
    </div>
  )
}

export default Feed
