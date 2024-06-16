import { useSelector } from "react-redux"

const Profile = () => {
  const {currentUser} = useSelector((state) => state.user)
  return (
    <div className="max-w-lg mx-auto p-2 sm:p-0">
      <h1 className='text-center text-4xl font-semibold text-teal-400 mt-8 mb-6'>Profile</h1>
      <form className="flex flex-col gap-4">
        <img className="h-28 w-28 rounded-full object-cover cursor-pointer my-4 self-center" src={currentUser.avatar} alt="Profile Photo"/>
        <input className='bg-[#080F21] text-teal-400 focus:outline-none rounded-lg p-3' type="text" id='username' placeholder='Username' />
        <input className='bg-[#080F22] text-teal-400 focus:outline-none p-3 rounded-lg' type="email" id='email' placeholder='Email' />
        <input className='bg-[#080F22] text-teal-400 focus:outline-none rounded-lg p-3' type="password" id='password' placeholder='Password' />
        <button className="border-transparent text-teal-400 text-xl bg-cyan-950 rounded-lg hover:bg-teal-500 hover:text-black hover:scale-105 duration-300 transition-all ease-in-out bg-opacity-50 p-3">Edit &nbsp;✎</button>
      </form>
      <div className="flex mt-3 justify-between">
        <span className="text-red-500 cursor-pointer hover:underline transition-all duration-500">Delete Account</span>
        <span className="text-red-500 cursor-pointer hover:underline transition-all duration-500">Sign out</span>
      </div>
    </div>
  )
}

export default Profile
