import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/sign-up", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      //console.log(data);
      if (data.success === "false") {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/sign-in');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-center text-4xl my-10 text-teal-400'>Sign Up</h1>
      <form className='flex flex-col justify-center gap-5 text-teal-300' onSubmit={handleSubmit}>
        <input className='bg-[#080F21] focus:outline-none rounded-lg p-3' type="text" id='username' placeholder='Username' onChange={handleChange} />
        <input className='bg-[#080F22] focus:outline-none p-3 rounded-lg' type="email" id='email' placeholder='Email' onChange={handleChange} />
        <input className='bg-[#080F22] focus:outline-none rounded-lg p-3' type="password" id='password' placeholder='Password' onChange={handleChange} />
        <button disabled={loading} className='border-transparent bg-slate-800 rounded-lg hover:bg-teal-500 hover:text-black hover:scale-105 duration-300 transition-all ease-in-out bg-opacity-50 p-3'>{loading ? "Please Wait..." : "Register"}</button>
        <button className='border-transparent bg-teal-950 rounded-lg hover:bg-teal-500 hover:text-black hover:scale-105 duration-300 transition-all ease-in-out bg-opacity-50 p-3'>Continue with Google</button>
      </form>
      <div className='flex gap-2 mt-4'>
        <p>Already having an Account?</p>
        <Link to={"/sign-in"}>
          <span className='text-teal-300 opacity-80 hover:opacity-100'>Sign in</span>
        </Link>
      </div>
      {error && <p className='text-red-600 mt-5'>{error}</p>}
    </div>
  )
}

export default SignUp
