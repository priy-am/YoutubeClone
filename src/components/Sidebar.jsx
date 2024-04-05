import React from 'react'
import { GoHome } from "react-icons/go";
import { SiYoutubeshorts } from "react-icons/si";
import { MdOutlineSubscriptions } from "react-icons/md";
import { PiUserSquareLight } from "react-icons/pi";
import { GrHistory } from "react-icons/gr";
import { GoVideo } from "react-icons/go";
import { MdOutlineWatchLater } from "react-icons/md";
import { FiScissors } from "react-icons/fi";
import { MdOutlineChevronRight } from "react-icons/md";
import useUniqueId from '../useUniqueId';
import { useSelector } from 'react-redux'

const Sidebar = () => {
    const open = useSelector((state) => state.app.open)
    

    const sidebarHomeItem = [
        {
            icon:<GoHome />,
            title: "Home",
            id: useUniqueId()
        },
        {
            icon:<SiYoutubeshorts/>,
            title: "Shorts",
            id: useUniqueId()
        },
        {
            icon:<MdOutlineSubscriptions />,
            title: "Subscriptions",
            id: useUniqueId()
        },
    ];
    
    const sidebarYouItem = [
        {
            icon:<PiUserSquareLight />,
            title: "Your Channel",
            id: useUniqueId()
        },
        {
            icon:<GrHistory />,
            title: "History",
            id: useUniqueId()
        },
        {
            icon:<GoVideo />,
            title: "Your video",
            id: useUniqueId()
        },
        {
            icon:<MdOutlineWatchLater />,
            title: "Watch later",
            id: useUniqueId()
        },
        {
            icon: <FiScissors/>,
            title: "Your clips",
            id: useUniqueId()
        }
    ]

  return (

    <aside className={`${open?"w-[15%]":"w-20"} bg-[#0f0f0f] text-white pl-3 h-[calc(100vh-56px)] fixed top-16 overflow-y-auto pt-3`}>
        <div className="home">
            <ul className=''>
            {
            sidebarHomeItem.map((item)=>{
                return <li key={item.id} className='flex items-center gap-2 side-btn'>{item.icon}<span className={open?"":"hidden"}>{item.title}</span></li>
            })
        }
            </ul>
        </div>
        <div className="line h-[1px] bg-gray-600 w-[95%]"></div>
        <div className="you m-3">
            {open &&<h4 className='flex items-center'><span>You</span> <MdOutlineChevronRight/></h4>}
            <ul>
                {
                sidebarYouItem.map((item)=>{
                    return<li key={item.id} className='flex items-center gap-2 side-btn'>{item.icon} <span className={open?"":"hidden"}>{item.title}</span></li>
                })
                
                }
            </ul>
        </div>
        <div className="line h-[1px] bg-gray-600 w-[95%]"></div>
        {/* <div className="subscription m-3">
            <h4 className='flex items-center'><span>Subscriptions</span> <MdOutlineChevronRight/></h4>

        </div> */}

    </aside>
  )
}

export default Sidebar
