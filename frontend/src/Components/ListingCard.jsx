import { MdLocationOn } from 'react-icons/md'
import {Link} from 'react-router-dom'

const ListingCard = ({key, listing}) => {
  return (
    <div className='bg-[#080F22] overflow-hidden rounded-md w-full sm:w-[320px]'>
        <Link to={`/listing/${listing._id}`}>
            <img src={listing.imageURLs[0]} alt="listing image" className='h-[320px] sm:h-[220px] w-full object-cover sm:hover:scale-105 transition-all duration-300' />
            <div className='p-3 flex flex-col gap-2'>
                <p className='truncate text-teal-400 text-xl font-bold'>{listing.name}</p>
                <div className='flex gap-1 items-center w-full'>
                    <MdLocationOn className='text-emerald-600 text-xl'/>
                    <p className='truncate text-gray-500 w-full'>{listing.address}</p>
                </div>
                <p className='text-teal-600 line-clamp-2'>{listing.description}</p>
                <div className='flex justify-between mt-2'>
                  <p className='bg-emerald-800 w-fit p-2 bg-opacity-30 rounded-[4px] text-teal-200'>₹{' '}{listing.offer?listing.discountPrice.toLocaleString('en-IN'):listing.regularPrice.toLocaleString('en-IN')}{listing.type==='rent' && ' / month'}</p>
                  {listing.offer && <p className='bg-green-900 w-fit p-2 rounded-[4px] animate-bounce text-teal-200'>{'Discount'}</p>}
                </div>
            </div>
        </Link>
    </div>
  )
}

export default ListingCard
