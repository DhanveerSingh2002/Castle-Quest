import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import {signInStart, signInSuccess, signInFailure} from '../redux/user/userSlice.js';

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const{loading, error} = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/sign-in", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      //console.log(data);
      if (data.success === "false") {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(data.message));
    }
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-center text-4xl my-10 text-teal-400'>Sign In</h1>
      <form className='flex flex-col justify-center gap-5 text-teal-300' onSubmit={handleSubmit}>
        <input className='bg-[#080F22] focus:outline-none p-3 rounded-lg' type="email" id='email' placeholder='Email' onChange={handleChange} />
        <input className='bg-[#080F22] focus:outline-none rounded-lg p-3' type="password" id='password' placeholder='Password' onChange={handleChange} />
        <button disabled={loading} className='border-transparent bg-slate-800 rounded-lg hover:bg-teal-500 hover:text-black hover:scale-105 duration-300 transition-all ease-in-out bg-opacity-50 p-3'>{loading ? "Please Wait..." : "Log in"}</button>
        <button className='border-transparent bg-teal-950 rounded-lg hover:bg-teal-500 hover:text-black hover:scale-105 duration-300 transition-all ease-in-out bg-opacity-50 p-3'>Continue with Google</button>
      </form>
      <div className='flex gap-2 mt-4'>
        <p>Dont have an Account?</p>
        <Link to={"/sign-up"}>
          <span className='text-teal-300 opacity-80 hover:opacity-100'>Sign up</span>
        </Link>
      </div>
      {error && <p className='text-red-600 mt-5'>{error}</p>}
    </div>
  )
}

export default SignIn
