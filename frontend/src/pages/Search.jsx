import React from 'react'

const Search = () => {
  return (
    <div className='flex flex-col sm:flex-row text-teal-400 accent-teal-400 sm:max-w-xl'>
        <div className="p-4 pt-6 border-b-2 border-b-teal-600 sm:border-r-2 sm:border-r-teal-600 sm:border-b-0 sm:min-h-screen">
            <form>
                <div className='flex items-center gap-3 justify-center'>
                    <label className='text-teal-400 text-2xl font-semibold' htmlFor="searchTerm">Search: </label>
                    <input type="text" id='searchTerm' className='bg-[#080F22] focus:outline-none p-2 rounded-md w-full' placeholder='Search...'/>
                </div>
                <div className='flex mt-6 items-center gap-4 flex-wrap text-lg'>
                    <label className='text-xl font-semibold'>Type: </label>
                    <div className="flex gap-1">
                        <input className="peer w-4" type="checkbox" id="all" />
                        <label htmlFor="all" className="peer-checked:opacity-100 opacity-50 cursor-pointer">
                            Rent & Sale
                        </label>
                    </div>

                    <div className="flex gap-1">
                        <input className='peer w-4' type="checkbox" id='rent' w-5/>
                        <label htmlFor='rent' className='peer-checked:opacity-100 opacity-50 cursor-pointer'>Rent</label>
                    </div>
                    <div className="flex gap-1">
                        <input className='peer w-4' type="checkbox" id='sell' w-5/>
                        <label htmlFor='sell' className='peer-checked:opacity-100 opacity-50 cursor-pointer'>On Sale</label>
                    </div>
                    <div className="flex gap-1">
                        <input className='peer w-4' type="checkbox" id='offer' w-5/>
                        <label htmlFor='offer' className='peer-checked:opacity-100 opacity-50 cursor-pointer'>Offer</label>
                    </div>
                </div>
                <div className='flex mt-6 items-center gap-4 flex-wrap text-lg'>
                    <label className='text-xl font-semibold'>Amenities: </label>
                    <div className="flex gap-1">
                        <input className='peer w-4' type="checkbox" id='parking' w-5/>
                        <label htmlFor='parking' className='peer-checked:opacity-100 opacity-50 cursor-pointer'>Parking Spot</label>
                    </div>
                    <div className="flex gap-1">
                        <input className='peer w-4' type="checkbox" id='furnished' w-5/>
                        <label htmlFor='furnished' className='peer-checked:opacity-100 opacity-50 cursor-pointer'>Furnished</label>
                    </div>
                </div>
                <div className='flex mt-6 items-center gap-4 flex-wrap text-lg'>
                    <label className='text-xl font-semibold' htmlFor="">Sort: </label>
                    <select id="sort_order" className='focus:outline-none p-2 bg-[#080F22] rounded-lg'>
                        <option value="">
                            Price low to high
                        </option>
                        <option className=''>
                            Price high to low
                        </option>
                        <option value="">
                            Latest
                        </option>
                        <option value="">
                            Oldest
                        </option>
                    </select>
                </div>  
                <button className='bg-emerald-800 bg-opacity-50 p-2 text-xl w-full mt-4 sm:mt-6 rounded-md hover:scale-105 hover:bg-teal-400 hover:text-black transition-all duration-300'>Submit</button>
            </form>
        </div>
        <div>
            <h1 className="text-4xl text-teal-400 font-semibold">Results:</h1>
        </div>
    </div>
  )
}

export default Search
