import {FaSearch} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

export default function Header() {
  const {currentUser} = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate =useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTerm = urlParams.get('searchTerm');
    if(searchTerm) 
    {
      setSearchTerm(searchTerm);
    }
  }, [location.search])
  

  return (
    <header className='bg-[#080f22] shadow-md'>
      <div className='flex justify-between items-center max-w-7xl mx-auto'>
        <Link to="/">
            <h1 className='font-bold text-xl flex flex-wrap p-4'>
                <span className='text-lg md:text-xl lg:text-4xl text-teal-300'>Castle</span>
                <span className='text-sm md:text-md lg:text-2xl text-teal-500'>Quest</span>
            </h1>
        </Link>
        <form className='bg-gray-900 p-2 rounded-lg flex justify-between items-center text-teal-300 mr-11 sm:mr-0' onSubmit={handleSubmit}>
            <input type="text" className='bg-transparent focus:outline-none w-24 sm:w-[200px] md:w-64' placeholder='Search...' value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)}/>
            <button>
              <FaSearch className=' text-teal-300'/>
            </button>
        </form>
        <ul className='flex gap-2 sm:gap-5 md:gap-7 mr-2 sm:text-lg'>
            <Link className='hidden sm:inline cursor-pointer text-teal-300 transition-all duration-500 hover:scale-125 opacity-80 hover:opacity-100 bg-[#080F22] p-2' to="/">
                <li>Home</li>
            </Link>
            <Link className='hidden sm:inline cursor-pointer text-teal-300 transition-all duration-500 hover:scale-125 opacity-80 hover:opacity-100 bg-[#080F22] p-2' to="/about">
                <li>About</li>
            </Link>
            <Link  to="/profile">
                {
                  currentUser? 
                  <img className='rounded-full h-7 w-7 object-cover mr-4 sm:mr-0 bg-[#080F22] mt-2' src={currentUser.avatar} alt='profile'/>:
                  <li className='cursor-pointer text-teal-300 transition-all duration-500 hover:scale-125 mr-2 sm:mr-0 bg-emerald-900 p-2 rounded-sm bg-opacity-20'>Sign in</li>
                }
            </Link>
        </ul>
      </div>
    </header>
  )
}
