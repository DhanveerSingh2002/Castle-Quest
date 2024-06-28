import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';

const Listing = () => {

    SwiperCore.use([Navigation]);

    const[listing, setListing] = useState(null);
    const [loading, setLoading] = useState(false);
    const[error, setError] = useState(false);

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
            <>
                <Swiper navigation>
                    {listing.imageURLs.map((url) => {
                        return (
                            <SwiperSlide key={url}>
                                <div className='h-[450px]' style={{background:`url(${url}) center no-repeat`, backgroundSize:"contain"}}></div>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </>
        )}
    </main>
  )
}

export default Listing
