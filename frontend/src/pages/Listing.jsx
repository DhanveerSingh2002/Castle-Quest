import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { useSelector } from 'react-redux';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import { FaBath, FaBed, FaChair, FaParking } from 'react-icons/fa';
import Contact from '../Components/Contact';

const Listing = () => {

    SwiperCore.use([Navigation]);

    const[listing, setListing] = useState(null);
    const [loading, setLoading] = useState(false);
    const[error, setError] = useState(false);
    const [copied, setCopied] = useState(false);
    const [contact, setContact] = useState(false);
    const { currentUser } = useSelector((state) => state.user);

    const params = useParams();

    useEffect(()=>{
        const fetchListing = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/listing/get/${params.listingId}`);
                const data = await res.json();
                if(data.success === false)
                {
                    setError(true);
                    setLoading(false);
                    return;
                }
                setListing(data);
                setLoading(false);
                setError(false);
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        }
        fetchListing();
    }, []);
  return (
    <main>
        {loading && <p className='text-center text-2xl text-teal-400'>Please Wait...</p>}
        {error && <p className='text-center text-2xl text-red-500'>Error fetching listing.</p>}
        {!loading && !error && listing && (
            <div>
                <Swiper navigation className='accent-teal-400'>
                    {listing.imageURLs.map((url) => {
                        return (
                            <SwiperSlide key={url}>
                                <div className='h-[550px]' style={{background:`url(${url}) center no-repeat`, backgroundSize:"contain"}}></div>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
                <div className='fixed top-[13%] right-[3%] z-10 rounded-full w-12 h-12 flex justify-center items-center bg-gray-800 cursor-pointer'>
                    <i className="fa-solid fa-share text-teal-400 outline-none" onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                        setCopied(true);
                        setTimeout(() => {
                        setCopied(false);
                        }, 2000);
                    }}/>
                </div>
                {copied && (
                    <p className='fixed top-[23%] right-[5%] z-10 rounded-md bg-gray-800 text-teal-400 p-2'>
                        Link copied!
                    </p>
                )}
                <div className='flex flex-col max-w-[834px] mx-auto p-3 my-7 gap-4'>
                    <p className='sm:text-3xl text-lg font-semibold text-teal-400'>
                        <span className='font-bold'>{listing.name}</span>
                        {listing.offer ? <span>  - ₹{' '} <span className='line-through'>{listing.regularPrice.toLocaleString('en-IN')}</span> {listing.discountPrice.toLocaleString('en-IN')}</span> :<span><span>  - ₹{' '}  </span>{listing.regularPrice.toLocaleString('en-IN')}</span>}
                        {listing.type === 'rent' && ' / month'}
                    </p>
                    <p className="flex items-center gap-2 text-gray-500 my-2 text-md">
                    <i className="fa-solid fa-location-dot text-teal-400"></i>
                    {listing.address}
                    </p>
                    <div className="flex gap-4">
                        <p className="bg-blue-900 bg-opacity-40 text-center w-full max-w-[200px] text-teal-400 rounded-md p-2">
                            { listing.type === "rent" ? "For Rent" : "For Sale" }
                        </p>
                        {
                            listing.offer && (
                                <p className='bg-emerald-700 bg-opacity-50 w-full max-w-[200px] text-teal-400 text-center p-2 rounded-md '><b className='underline'>₹{(+listing.regularPrice - +listing.discountPrice).toLocaleString("en-IN")}</b> OFF !!</p>
                            )
                        }
                    </div>
                    <p className='text-teal-300 text-xl mt-2'><span className='text-teal-500 font-semibold text-2xl underline'>Description<i className='fa-solid fa-arrow-right text-xl'></i></span> {listing.description}</p>
                    <ul className='flex gap-2 sm:gap-4 flex-wrap mt-2'>
                        <li className='flex items-center gap-2 bg-black w-fit p-2 rounded-lg text-teal-400'>
                            <FaBed className='text-xl'/>
                            {
                                listing.bedrooms>1?`${listing.bedrooms} Beds`:`${listing.bedrooms} Bed`
                            }
                        </li>
                        <li className='flex items-center gap-2 bg-black w-fit p-2 rounded-lg text-teal-400'>
                            <FaBath className='text-xl'/>
                            {
                                listing.bathrooms>1?`${listing.bathrooms} Baths`:`${listing.bathrooms} Bath`
                            }
                        </li>
                        <li className='flex items-center gap-2 bg-black w-fit p-2 rounded-lg text-teal-400'>
                            <FaParking className='text-xl'/>
                            {
                                listing.parking?"Parking Available":`No Parking Spot`
                            }
                        </li>
                        <li className='flex items-center gap-2 bg-black w-fit p-2 rounded-lg text-teal-400'>
                            <FaChair className='text-xl'/>
                            {
                                listing.furnished?`Furnished`:`Not furnished`
                            }
                        </li>
                    </ul>
                    {
                        currentUser && listing.userRef !== currentUser._id && !contact && 
                        (
                            <button onClick={()=>setContact(true)} className='mt-4 bg-slate-700 bg-opacity-30 text-teal-400 active:bg-opacity-70 active:bg-teal-400 active:text-black sm:hover:text-black sm:hover:bg-teal-400 p-3 rounded-lg text-xl sm:hover:scale-105 transition-all duration-300'>Contact The Landlord</button>
                        )
                    }
                    {
                        contact && 
                        (
                            <Contact listing={listing}/>
                        )
                    }
                </div>
            </div>
        )}
    </main>
  )
}

export default Listing
