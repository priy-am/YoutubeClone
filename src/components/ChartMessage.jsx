import React from 'react'

const ChartMessage = (item) => {
    return (
        <div className='flex items-center my-1 rounded-2xl hover:bg-gray-700'>
            <img className="rounded-full p-3 w-12" src="https://yt3.ggpht.com/9p-HY1sL3EiO8zRz-NNwl43h55DDTa2Oi-O9ZuRABG06kixfAg08FiSQAbQOko1O6NF6rrVN_Mw=s68-c-k-c0x00ffffff-no-rj" alt="user"/>
            <div className="msg flex items-center gap-2">
                <h4 className='text-gray-400'>{item.item.name}</h4>
                <div className="msg">{item.item.message}</div>
            </div>
        </div>
    )
}

export default ChartMessage
