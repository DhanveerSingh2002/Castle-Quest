import {FaSearch} from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className='bg-[#080f22] shadow-md'>
      <div className='flex justify-between items-center max-w-7xl mx-auto'>
        <Link to="/">
            <h1 className='font-bold text-xl flex flex-wrap p-4'>
                <span className='text-xl md:text-4xl text-teal-300'>Castle</span>
                <span className='text-sm md:text-2xl text-teal-500'>Quest</span>
            </h1>
        </Link>
        <form className='bg-gray-900 p-2 rounded-lg flex justify-between items-center text-teal-300 mr-11 sm:mr-0'>
            <input type="text" className='bg-transparent focus:outline-none w-24 sm:w-[200px] md:w-64' placeholder='Search...'/>
            <FaSearch className=' text-teal-300'/>
        </form>
        <ul className='flex gap-2 sm:gap-5 md:gap-7 mr-2 sm:text-lg'>
            <Link className='hidden sm:inline cursor-pointer text-teal-300 transition-all duration-500 hover:scale-125 opacity-80 hover:opacity-100' to="/">
                <li>Home</li>
            </Link>
            <Link className='hidden sm:inline cursor-pointer text-teal-300 transition-all duration-500 hover:scale-125 opacity-80 hover:opacity-100' to="/about">
                <li>About</li>
            </Link>
            <Link className='cursor-pointer text-teal-300 transition-all duration-500 hover:scale-125 opacity-80 hover:opacity-100 mr-2 sm:mr-0' to="/sign-in">
                <li>Sign in</li>
            </Link>
        </ul>
      </div>
    </header>
  )
}
