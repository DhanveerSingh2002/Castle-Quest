import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Search = () => {

    const [sidebarData, setSidebarData] = useState({
        searchTerm:'',
        type: 'all',
        parking: false,
        furnished: false,
        offer: false,
        sort: 'created_at', 
        order: 'desc',
    });
    const [loading, setLoading] = useState(false);
    const [listings, setListings] = useState([]);
    console.log(listings)

    const navigate = useNavigate();

    //console.log(sidebarData);

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromURL = urlParams.get('searchTerm');
        const typeFromURL = urlParams.get('type');
        const parkingFromURL = urlParams.get('parking');
        const furnishedFromURL = urlParams.get('furnished');
        const offerFromURL = urlParams.get('offer');  
        const sortFromURL = urlParams.get('sort');
        const orderFromURL = urlParams.get('order');

        if(searchTermFromURL || typeFromURL || parkingFromURL || furnishedFromURL || offerFromURL || sortFromURL || orderFromURL)
        {
            setSidebarData({
                searchTerm: searchTermFromURL || '',
                type: typeFromURL || 'all',
                offer: offerFromURL === 'true' ? true : false,
                parking: parkingFromURL === 'true' ? true : false,
                furnished: furnishedFromURL === 'true' ? true : false,
                sort: sortFromURL || 'created_at',
                order: orderFromURL || 'desc',
            });
        }

        const fetchListings = async () => {
            try {
                setLoading(true);
                const searchQuery = urlParams.toString();
                const res = await fetch(`/api/listing/get?${searchQuery}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await res.json();
                setListings(data);
                setLoading(false);
            } catch (error) {
                console.log(error.message);
            }
        }
        fetchListings();
    }, [location.search])
    

    const handleChange = (e) => {
        if(e.target.id === 'all' || e.target.id === 'rent' || e.target.id === 'sell')
        {
            setSidebarData({
                ...sidebarData,
                type:e.target.id
            });
        }

        if(e.target.id === 'searchTerm')
        {
            setSidebarData({
                ...sidebarData,
                searchTerm: e.target.value
            });
        }

        if(e.target.id === 'offer' || e.target.id === 'parking' || e.target.id === 'furnished')
        {
            setSidebarData({
                ...sidebarData,
                [e.target.id]: e.target.checked || e.target.checked === 'true' ? true : false,
            });
        }

        if(e.target.id === 'sort_order')
        {
            const sort = e.target.value.split('_')[0] || 'created_at';
            const order = e.target.value.split('_')[1] || 'desc';
            setSidebarData({
                ...sidebarData,
                sort,
                order
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams();
        urlParams.set('searchTerm',sidebarData.searchTerm);
        urlParams.set('type', sidebarData.type);
        urlParams.set('parking', sidebarData.parking);
        urlParams.set('furnished', sidebarData.furnished);
        urlParams.set('offer', sidebarData.offer);
        urlParams.set('sort', sidebarData.sort);
        urlParams.set('order', sidebarData.order);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`)
    };

  return (
    <div className='flex flex-col sm:flex-row text-teal-400 accent-teal-400 sm:max-w-xl'>
        <div className="p-4 pt-6 border-b-2 border-b-teal-600 sm:border-r-2 sm:border-r-teal-600 sm:border-b-0 sm:min-h-screen">
            <form onSubmit={handleSubmit}>
                <div className='flex items-center gap-3 justify-center'>
                    <label className='text-teal-400 text-2xl font-semibold' htmlFor="searchTerm">Search: </label>
                    <input type="text" id='searchTerm' className='bg-[#080F22] focus:outline-none p-2 rounded-md w-full' placeholder='Search...' value={sidebarData.searchTerm} onChange={handleChange}/>
                </div>
                <div className='flex mt-6 items-center gap-4 flex-wrap text-lg'>
                    <label className='text-xl font-semibold'>Type: </label>
                    <div className="flex gap-1">
                        <input className="peer w-4" type="checkbox" id="all" checked={sidebarData.type === 'all'} onChange={handleChange}/>
                        <label htmlFor="all" className="peer-checked:opacity-100 opacity-50 cursor-pointer">
                            Rent & Sale
                        </label>
                    </div>

                    <div className="flex gap-1">
                        <input className='peer w-4' type="checkbox" id='rent' checked={sidebarData.type === 'rent'} onChange={handleChange}/>
                        <label htmlFor='rent' className='peer-checked:opacity-100 opacity-50 cursor-pointer'>Rent</label>
                    </div>
                    <div className="flex gap-1">
                        <input className='peer w-4' type="checkbox" id='sell' checked={sidebarData.type === 'sell'} onChange={handleChange}/>
                        <label htmlFor='sell' className='peer-checked:opacity-100 opacity-50 cursor-pointer'>On Sale</label>
                    </div>
                    <div className="flex gap-1">
                        <input className='peer w-4' type="checkbox" id='offer' checked={sidebarData.offer === true} onChange={handleChange}/>
                        <label htmlFor='offer' className='peer-checked:opacity-100 opacity-50 cursor-pointer'>Offer</label>
                    </div>
                </div>
                <div className='flex mt-6 items-center gap-4 flex-wrap text-lg'>
                    <label className='text-xl font-semibold'>Amenities: </label>
                    <div className="flex gap-1">
                        <input className='peer w-4' type="checkbox" id='parking' checked={sidebarData.parking === true} onChange={handleChange}/>
                        <label htmlFor='parking' className='peer-checked:opacity-100 opacity-50 cursor-pointer'>Parking Spot</label>
                    </div>
                    <div className="flex gap-1">
                        <input className='peer w-4' type="checkbox" id='furnished' checked={sidebarData.furnished === true} onChange={handleChange}/>
                        <label htmlFor='furnished' className='peer-checked:opacity-100 opacity-50 cursor-pointer'>Furnished</label>
                    </div>
                </div>
                <div className='flex mt-6 items-center gap-4 flex-wrap text-lg'>
                    <label className='text-xl font-semibold'>Sort: </label>
                    <select onChange={handleChange} defaultValue={'created_at_desc'} id="sort_order" className='focus:outline-none p-2 bg-[#080F22] rounded-lg'>
                        <option value="regularPrice_asc">
                            Price low to high
                        </option>
                        <option value="regularPrice_desc">
                            Price high to low
                        </option>
                        <option value="createdAt_desc">
                            Latest
                        </option>
                        <option value="createdAt_asc">
                            Oldest
                        </option>
                    </select>
                </div>  
                <button className='bg-emerald-800 bg-opacity-50 p-2 text-xl w-full mt-4 sm:mt-6 rounded-md hover:scale-105 hover:bg-teal-400 hover:text-black transition-all duration-300'>Submit</button>
            </form>
        </div>
        <div>
            <h1 className="text-4xl text-teal-400 font-semibold sm:ml-4 sm:mt-4">Results:</h1>
        </div>
    </div>
  )
}

export default Search
