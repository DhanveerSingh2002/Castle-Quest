import React from 'react'
import { Link } from 'react-router-dom'

const SignUp = () => {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-center text-4xl my-10 text-teal-400'>Sign Up</h1>
      <form className='flex flex-col justify-center gap-5 text-teal-300'>
        <input className='bg-[#080F22] bg-transparent focus:outline-none rounded-lg p-3' type="text" id='username' placeholder='Username'/>
        <input className='bg-[#080F22] bg-transparent focus:outline-none p-3 rounded-lg' type="email" id='email' placeholder='Email'/>
        <input className='bg-[#080F22] bg-transparent focus:outline-none rounded-lg p-3' type="password" id='password' placeholder='Password'/>
        <button className='border-transparent bg-slate-800 rounded-lg hover:bg-teal-500 hover:text-black hover:scale-105 duration-300 transition-all ease-in-out bg-opacity-50 p-3'>Register</button>
        <button className='border-transparent bg-teal-950 rounded-lg hover:bg-teal-500 hover:text-black hover:scale-105 duration-300 transition-all ease-in-out bg-opacity-50 p-3'>Continue with Google</button>
      </form>
      <div className='flex gap-2 mt-4'>
        <span>Already having an Account?</span>
        <Link to="/sign-in"><span className='text-teal-300 opacity-80 hover:opacity-100'>Sign in</span></Link>
      </div>
    </div>
  )
}

export default SignUp
