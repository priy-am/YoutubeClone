import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCategory } from '../app/appSlice';


const buttonList = ["Music", "Web Devlopment", "News", "Object-oriented programing", "Bollywood music", "Rituals", "Music", "Web Devlopment", "News", "Object-oriented programing", "Bollywood music", "Rituals", "Music", "Web Devlopment", "News", "Object-oriented programing", "Bollywood music", "Rituals"];

const Button = () => {
  const [active, setActive] = useState("All")
  const dispatch = useDispatch()
  const videoByTag = (tag)=>{
    if(active != tag){
      setActive(tag)
      dispatch(addCategory(tag));
    }
  }
  
  return (
    <div className='mx-6 my-3 flex overflow-x-auto items-center no-scrollbar '>
      {
      buttonList.map((item, index)=>{
        return (
          
            <span onClick={()=>{videoByTag(item)}} key={index} className={`${active == item?"bg-white text-black":"bg-[#272727]"} px-4 py-1 rounded-lg mx-2 font-bold cursor-pointer whitespace-nowrap `}>{item}</span>
          
            )
      })
      }

      
    </div>
  )
}

export default Button
