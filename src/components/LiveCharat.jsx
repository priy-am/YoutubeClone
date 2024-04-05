import React from 'react'
import ChartMessage from './ChartMessage'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { setMessage } from '../app/chatSlice'


const LiveCharat = () => {
    const message = useSelector((store)=>store.chat.message)
    const dispatch = useDispatch()
    // useEffect(() => {
    //   setInterval(() => {
    //     dispatch(setMessage({name:"piyam", message: "random text"}))
    //   }, 1000);
    // }, [])
    


  return (
    <div className=''>
        {
            message.map((item, i)=>{
                return <ChartMessage key={i} item={item}/>
            })
        }
    </div>
  )
}

export default LiveCharat
