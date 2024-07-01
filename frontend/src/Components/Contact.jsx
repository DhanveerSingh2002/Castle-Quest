import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Contact = ({listing}) => {
    const [landlord, setLandlord] = useState(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchLandlord = async () => {
            try {
                const response = await fetch(`/api/user/${listing.userRef}`);
                const data = await response.json();
                setLandlord(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchLandlord();
    }, [listing.userRef])

    const onChange = (e) => {
        setMessage(e.target.value);
    }

  return (
    <>
        {
            landlord && 
            (
                <>
                <div className=' text-teal-400 mt-4 flex flex-col gap-2'>
                    <p className='hidden sm:block'><span>Reach out to the Landlord </span><span className='font-bold'>{landlord.username}</span><span> at </span><span className='font-bold'>{landlord.email}</span></p>
                    <p className='sm:hidden'>Chat with <span className='font-bold text-xl'>{landlord.username}</span> for <span className='font-bold text-xl'>{listing.name}</span></p>
                    <textarea onChange={onChange} id="message" value={message} placeholder='Enter your message here...' className='focus:outline-none bg-[#080F22] sm:hidden' rows={2}></textarea>
                    <Link to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`} className='sm:hidden bg-slate-700 bg-opacity-30 text-teal-400 active:bg-opacity-70 active:bg-teal-400 active:text-black sm:hover:text-black sm:hover:bg-teal-400 p-2 rounded-lg text-xl sm:hover:scale-105 transition-all duration-300 text-center cursor-pointer w-full'>
                        Send 
                    </Link>  
                    
                </div>
                </>
            )
        }
    </>
  )
}

export default Contact
