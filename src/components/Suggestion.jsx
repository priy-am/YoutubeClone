import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { IoIosSearch } from "react-icons/io";
import { addCategory, setinput} from "../app/appSlice";

const Suggestion = () => {
    const dispatch = useDispatch()
    const { serachSuggestion } = useSelector((store) => store.app);
    return (
        <>
        {serachSuggestion.length != 0 && <div className='bg-gray-800 text-white rounded-md  w-full'>
            <ul className='px-2 py-1 pt-2' >
                {
                    serachSuggestion.map((text, index) => {
                        return (
                            <li onClick={()=>{dispatch(addCategory(text));dispatch(setinput(""))}} key={index} className='hover:bg-gray-600 py-1 px-2 mb-1 rounded-md flex items-center'> 
                            <button className='mr-2'><IoIosSearch/></button>{text}</li>
                        )
                    })
                }
            </ul>
        </div>}
        </>
    )
}

export default Suggestion
