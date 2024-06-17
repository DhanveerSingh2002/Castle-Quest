import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { app } from "../FireBase";
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';

const Profile = () => {

  const fileRef = useRef(null);
  const {currentUser} = useSelector((state) => state.user)
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});

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
  

  return (
    <div className="max-w-lg mx-auto p-2 sm:p-0">
      <h1 className='text-center text-4xl font-semibold text-teal-400 mt-8 mb-6'>Profile</h1>
      <form className="flex flex-col gap-4">
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
