import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { app } from "../FireBase";
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import {userUpdateStart, userUpdateSuccess, userUpdateFailure, userDeleteFailure, userDeleteSuccess, userDeleteStart, userSignOutFailure, userSignOutStart, userSignOutSuccess} from '../redux/user/userSlice';
import { useDispatch } from "react-redux";
import {Link} from 'react-router-dom';

const Profile = () => {

  const fileRef = useRef(null);
  const {currentUser, loading, error} = useSelector((state) => state.user)
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if(file)
    {
      handleFileUpload(file);
    }
  }, [file])

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', (snapshot) =>{
      const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
      setFilePerc(Math.round(progress));
    },
    (error) => {
      setFileUploadError(true);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then(
        (downloadURL) => {
          setFormData({
          ...formData,
            avatar:downloadURL
          });
        }
      )
    }
  )
  };
  
  const handleChange = (e) => {
    setFormData({
     ...formData,
      [e.target.id]: e.target.value
    });
  }

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        dispatch(userUpdateStart());
        const res = await fetch(`/api/user/update/${currentUser._id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if(data.success === false)
        {
          dispatch(userUpdateFailure(data.message));
          return;
        }
        dispatch(userUpdateSuccess(data));
        setUpdateSuccess(true);
      } catch (error) {
        dispatch(userUpdateFailure(error.message));
      }
  }

  const handleDeleteUser = async () => {
    try {
      dispatch(userDeleteStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if(data.success === false)
      {
        dispatch(userDeleteFailure(data.message));
        return;
      }
      dispatch(userDeleteSuccess(data));
    } catch (error) {
      dispatch(userDeleteFailure(error.message));
    }
  };

  const handleSignOutUser = async () => {
    try {
      dispatch(userSignOutStart());
      const res = await fetch('/api/auth/sign-out');
      const data = await res.json();
      if(data.success === false)
      {
        dispatch(userSignOutFailure(data.message));
        return ;
      }
      dispatch(userSignOutSuccess(data));
    } catch (error) {
      dispatch(userSignOutFailure(error.message));
    }
  };

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if(data.success === false)
      {
        setShowListingsError(true);
        return;
      }
      //window.scrollTo(500, 500);
      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  }

  return (
    <div className="max-w-lg mx-auto p-2 sm:p-0">
      <h1 className='text-center text-4xl font-semibold text-teal-400 my-3'>Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input onChange={(e)=>setFile(e.target.files[0])} type="file" ref={fileRef} className="hidden" accept="image/*"/>
        <img onClick={()=>fileRef.current.click()} className="h-28 w-28 rounded-full object-cover cursor-pointer mt-2 self-center" src={formData.avatar || currentUser.avatar} alt="Profile Photo"/>
        <p className="self-center">
          {
            fileUploadError
            ?<span className="text-red-500 text-lg">Error uploding the image</span> 
            :filePerc > 0 && filePerc < 100 
              ? (<span className="text-blue-500 text-lg">Uploading {filePerc}%</span>)
              : filePerc === 100 
                ? (<span className="text-green-600 text-lg">Image uploaded successfully</span>)
                : ''
          }
        </p>
        <input className='bg-[#080F21] text-teal-400 focus:outline-none rounded-lg p-3' type="text" defaultValue={currentUser.username} id='username' placeholder='Username' onChange={handleChange}/>
        <input className='bg-[#080F22] text-teal-400 focus:outline-none p-3 rounded-lg' type="email" defaultValue={currentUser.email} id='email' placeholder='Email' onChange={handleChange}/>
        <input className='bg-[#080F22] text-teal-400 focus:outline-none rounded-lg p-3' type="password" id='password' placeholder='Password' onChange={handleChange}/>
        <button disabled={loading} className="border-transparent text-teal-400 text-xl bg-cyan-950 rounded-lg hover:bg-teal-500 hover:text-black hover:scale-105 duration-300 transition-all ease-in-out bg-opacity-50 p-3">{loading ? "Please Wait..." : `Edit ✎`}</button>
        <Link to={'/create-listing'} className="text-center border-transparent text-teal-400 text-xl bg-emerald-900 bg-opacity-50 rounded-lg hover:bg-teal-500 hover:text-black hover:scale-105 duration-300 transition-all ease-in-out p-3">Create a Listing ✉</Link>
      </form>
      <div className="flex mt-3 justify-between">
        <span onClick={handleDeleteUser} className="text-red-500 cursor-pointer hover:underline transition-all duration-500">Delete Account</span>
        <span onClick={handleSignOutUser} className="text-red-500 cursor-pointer hover:underline transition-all duration-500">Sign out</span>
      </div>
      <p className="text-red-500 mt-5">{error?error:''}</p>
      <p className="text-green-500 mt-5 self-center text-md">{updateSuccess?"Profile updated successfully.":''}</p>   
      <div className="flex justify-center mt-5">
        <button onClick={handleShowListings} type="button" className="bg-green-900 text-teal-400 bg-opacity-40 p-2 rounded-lg hover:bg-teal-400 hover:text-black hover:scale-105 transition-all duration-300">Show your listings</button>   
        <p className="text-red-500 mt-5">{showListingsError?showListingsError:''}</p>
      </div> 
      {
        userListings && userListings.length > 0 &&
          userListings.map((listing) => {
            return (
              <div key={listing._id} className="flex items-center justify-between rounded-lg bg-[#080F22] p-6 gap-4 mt-5">
                <Link to={`/listings/${listing._id}`} className="flex justify-between">
                  <img src={listing.imageURLs[0]} className="w-24 h-24 object-conatin rounded-lg" alt="Property Image" />
                </Link>
                <Link className="text-teal-400 text-lg flex-1" to={`/listings/${listing._id}`}>
                  <p>{listing.name}</p>
                </Link>
                <div className="flex flex-col gap-4">
                  <i title="Delete" className="fa fa-trash text-2xl border-transparent bg-red-800 cursor-pointer bg-opacity-90 text-black rounded-md hover:bg-black text-center hover:text-red-700 hover:scale-110 duration-300 transition-all p-1 px-2"></i>
                  <i title="Edit" className="fa fa-pencil text-2xl border-transparent bg-blue-700 cursor-pointer bg-opacity-90 text-black rounded-md hover:bg-black hover:text-blue-700 hover:scale-110 duration-300 transition-all p-1 px-2"></i>
                </div>
              </div>
            )
          })
      }                          
    </div>
  )
}

export default Profile
