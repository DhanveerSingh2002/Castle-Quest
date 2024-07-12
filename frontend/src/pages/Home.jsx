import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import SwiperCore from 'swiper';
import { Navigation } from'swiper/modules';
import ListingCard from '../Components/ListingCard';

const Home = () => {

  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);

  //console.log(saleListings);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch(`/api/listing/get?offer=true&limit=4&sort=created_at&order=asc`);
        const data = await res.json();
        setOfferListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    }

    const fetchSaleListings = async () => {
      try {
        const res = await fetch(`/api/listing/get?type=sell&limit=4`);
        const data = await res.json();
        setSaleListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    }

    const fetchRentListings = async () => {
      try {
        const res = await fetch(`/api/listing/get?type=rent&limit=4`);
        const data = await res.json();
        setRentListings(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchOfferListings();
  }, []);

  return (
    <div className=''>
      <div className='flex bg-[#111829]'>
        <div className='p-28 px-3 flex flex-col gap-8 max-w-7xl mx-auto sm:ml-[120px]'>
          <h1 className='sm:text-6xl text-4xl text-teal-400 font-bold'>Your <span className='text-green-500'>Dream</span> Property<br/> is Waiting for You!</h1>
          <p className='text-teal-500 text-lg sm:text-xl'>CastleQuest is a platform for property owners to easily find, rent, or sell properties. <br/>Catering to those seeking a place to stay, live, or buy.</p>
          <Link to={'/search'} className='text-teal-200 p-3 rounded-md w-fit bg-[#2CBB5D] bg-opacity-10 animate-wiggle animate-infinite'>Explore Now</Link>
        </div>
        <div className='flex justify-center items-center mr-6'>
          <img src="mainLogo-transformed.jpeg" alt="" className='h-[400px] w-[550px] object-cover rounded-xl hidden sm:flex mr-12' />
        </div>
      </div>

      {/* <Swiper navigation className='sm:hidden -mt-16'>
      {
        offerListings && offerListings.length > 0 && 
        offerListings.map((listing) => {
          return (
            <SwiperSlide>
              <div key={listing._id} style={{background: `url(${listing.imageURLs[0]}) center no-repeat`, backgroundSize: "cover"}} className='h-[00px] sm:h-[600px]'>
                
              </div>
            </SwiperSlide>
          );
        })
      }
      </Swiper> */}

      <div className="max-w-7xl mx-auto p-3 flex flex-col sm:my-10 gap-32">
        {
          offerListings && offerListings.length > 0 && 
          (
            <div className="flex flex-col gap-4 -my-12">
              <div className="flex flex-col gap-2 ">
                <h2 className='text-3xl font-semibold text-teal-400'>Recent Offers</h2>
                <Link to={'/search?offer=true'} className='text-sm font-semibold bg-sky-600 text-teal-400 bg-opacity-10 p-2 w-fit rounded-[4px]'>Show more</Link>
              </div>
              <div className='flex flex-wrap gap-6'>
                {
                  offerListings.map((listing) => (
                    <ListingCard key={listing._id} listing={listing}/>
                  ))
                }
              </div>
            </div>
          )
        }
        {
          saleListings && saleListings.length > 0 && 
          (
            <div className="flex flex-col gap-4 -my-12">
              <div className="flex flex-col gap-2 ">
                <h2 className='text-3xl font-semibold text-teal-400'>Properties for Sale</h2>
                <Link to={'/search?type=sell'} className='text-sm font-semibold bg-sky-600 text-teal-400 bg-opacity-10 p-2 w-fit rounded-[4px]'>Show more</Link>
              </div>
              <div className='flex flex-wrap gap-6'>
                {
                  saleListings.map((listing) => (
                    <ListingCard key={listing._id} listing={listing}/>
                  ))
                }
              </div>
            </div>
          )
        }
        {
          rentListings && rentListings.length > 0 && 
          (
            <div className="flex flex-col gap-4 -my-12">
              <div className="flex flex-col gap-2 ">
                <h2 className='text-3xl font-semibold text-teal-400'>Properties for renting</h2>
                <Link to={'/search?type=rent'} className='text-sm font-semibold bg-sky-600 text-teal-400 bg-opacity-10 p-2 w-fit rounded-[4px]'>Show more</Link>
              </div>
              <div className='flex flex-wrap gap-6'>
                {
                  rentListings.map((listing) => (
                    <ListingCard key={listing._id} listing={listing}/>
                  ))
                }
              </div>
            </div>
          )
        }
      </div>

    </div>
  )
}

export default Home
