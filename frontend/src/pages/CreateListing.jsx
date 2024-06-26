import React, { useState } from 'react'
import { app } from '../FireBase';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { useSelector } from "react-redux"
import {useNavigate} from 'react-router-dom';

const CreateListing = () => {

  const {currentUser} = useSelector((state) => state.user);
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageURLs: [],
    name:'',
    description:'',
    address:'',
    type:'rent',
    bathrooms:1,
    bedrooms:1,
    regularPrice:500,
    discountPrice:0,
    furnished:false,
    parking:false,
    offer:false
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleImageSubmit = (e) => {
    if(files.length > 0 && files.length + formData.imageURLs.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for(let i = 0; i < files.length; i++) {
        promises.push(uploadImage(files[i]));
      }
      Promise.all(promises).then((urls) => {
        setFormData({
          ...formData,
          imageURLs: formData.imageURLs.concat(urls),
        });
        setImageUploadError(false);
        setUploading(false);
      }).catch(() => {
        setImageUploadError("Image size exceeded (max 2mb)");
      });
    }
    else if(files.length == 0){
      setImageUploadError("Please select atleast 1 image");
      setUploading(false);
    }
    else if(files.length + formData.imageURLs.length >= 7){
      setImageUploadError("You can only upload a maximum of 6 images");
      setUploading(false);
    }
  }

  console.log(formData);

  const uploadImage = async (file) => {
    return new Promise((resolve, reject) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed', (snapshot) =>{
          //const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
          //console.log(`Uploading ${progress}`);
        }, (error)=>{
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL);
          });
        }
      )
      }
    );
  }

  const handleChange = (e) => {
    if(e.target.id === "sell" || e.target.id === "rent")
    {
      setFormData({
        ...formData, 
        type:e.target.id
      });
    }

    if(e.target.id === "parking" || e.target.id === "furnished" || e.target.id === "offer")
    {
      setFormData({
        ...formData, 
        [e.target.id]:!formData[e.target.id]
      });
    }

    if(e.target.type === "number" || e.target.type === "text" || e.target.type === "textarea")
    {
      setFormData({
        ...formData, 
        [e.target.id]:e.target.value
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(formData.imageURLs.length < 1)
      {
        setError("Please upload atleast 1 image");
        return;
      }
      if(formData.regularPrice < formData.discountPrice)
      {
        setError("Discount price must be less than regular price");
        return;
      }
      setLoading(true);
      setError(false);
      const res = await fetch('/api/listing/create',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        })
      });
      const data = await res.json();
      setLoading(false);
      if(data.success === false)
      {
        setError(data.message);
      }
      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }

  return (
    <main className='p-4 max-w-4xl mx-auto'>
      <h1 className='text-4xl font-semibold text-center mb-8 mt-2 text-teal-400'>Create a Listing</h1>
      <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-8'>
        <div className='flex flex-col gap-4 flex-1'>
            <input className='bg-[#080F21] text-teal-400 focus:outline-none rounded-lg p-3' type="text" id="name" placeholder='Title' required onChange={handleChange} value={formData.name}/>
            <textarea className='bg-[#080F21] text-teal-400 focus:outline-none rounded-lg p-3' type="text" id="description" placeholder='Description' required onChange={handleChange} value={formData.description}/>
            <input className='bg-[#080F21] text-teal-400 focus:outline-none rounded-lg p-3' type="text" id="address" placeholder='Address' required onChange={handleChange} value={formData.address}/>
        
        <div className="flex gap-7 flex-wrap accent-teal-400 mt-2">
          <div className="flex gap-2">
            <input className='w-5' type="checkbox" id='sell' onChange={handleChange} checked={formData.type === "sell"}/>
            <span className='text-[#9CA3AF]'>Sell</span>
          </div>
          <div className="flex gap-2">
            <input className='w-5' type="checkbox" id='rent' onChange={handleChange} checked={formData.type === "rent"}/>
            <span className='text-[#9CA3AF]'>Rent</span>
          </div>
          <div className="flex gap-2">
            <input className='w-5' type="checkbox" id='parking' onChange={handleChange} checked={formData.parking}/>
            <span className='text-[#9CA3AF]'>Parking Spot</span>
          </div>
          <div className="flex gap-2">
            <input className='w-5' type="checkbox" id='furnished' onChange={handleChange} checked={formData.furnished}/>
            <span className='text-[#9CA3AF]'>Furnished</span>
          </div>
          <div className="flex gap-2">
            <input className='w-5' type="checkbox" id='offer' onChange={handleChange} checked={formData.offer}/>
            <span className='text-[#9CA3AF]'>Offer</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 text-teal-400">
          <div className="flex items-center gap-2">
            <input placeholder='0' className='w-16 p-3 rounded-lg bg-[#080F21] border-teal focus:outline-none' type="number" id="bedrooms" required min={1} max={10} onChange={handleChange} value={formData.bedrooms}/>
            <p className='text-[#9CA3AF]'>Bedrooms</p>
          </div>
          <div className="flex items-center gap-2">
            <input placeholder='0' className='w-16 p-3 rounded-lg bg-[#080F21] border-teal focus:outline-none' type="number" id="bathrooms" required min={1} max={10} onChange={handleChange} value={formData.bathrooms}/>
            <p className='text-[#9CA3AF]'>Bathrooms</p>
          </div>
          <div className="flex items-center gap-2 mt-4">
            <input placeholder='0' className='w-24 p-3 rounded-lg bg-[#080F21] border-teal focus:outline-none' type="number" id="regularPrice" min={500} max={100000000} onChange={handleChange} value={formData.regularPrice}/>
            <div className="flex flex-col items-center">
              <p className='text-[#9CA3AF]'>Regular Price</p>
              <span className='text-xs text-[#9CA3AF]'>(₹/month)</span>
            </div>
          </div>
          {formData.offer &&
          <div className="flex items-center gap-2">
            <input placeholder='0' className='w-24 p-3 rounded-lg bg-[#080F21] border-teal focus:outline-none' type="number" id="discountPrice" min={0} max={100000000} onChange={handleChange} value={formData.discountPrice}/>
            <div className="flex flex-col items-center">
              <p className='text-[#9CA3AF]'>Discounted Price</p>
              <span className='text-xs text-[#9CA3AF]'>(₹/month)</span>
            </div>
          </div>
          }
        </div>
        </div>
        <div className='flex flex-col flex-1 gap-4'>
          <p className="font-semibold text-teal-300 text-lg sm:ml-5">
            Images: 
            <span className="font-light text-teal-500"> You can upload upto <b>6</b> images.</span>
          </p>
          <div className="flex justify-between p-4 text-teal-400">
            <label className='w-full mr-10 text-lg text-center cursor-pointer bg-[#080F21] text-[#9CA3A2] p-2 rounded-md hover:scale-110 transition-all duration-300' htmlFor="images">{files.length>0?`${files.length} file(s) selected`:"Browse Files"}</label>
            <input onChange={(e)=>setFiles(e.target.files)} className='hidden' type="file" id="images" multiple max={6} accept='image/* '/>
            <button disabled={uploading} onClick={handleImageSubmit} className='border-transparent bg-teal-950 rounded-lg hover:bg-teal-500 hover:text-black hover:scale-105 duration-300 transition-all ease-in-out bg-opacity-50 p-3' type='button'>{uploading?"Uploading...":"Upload"}</button>
            
          </div>
          <p className='text-red-500 sm:ml-4'>{imageUploadError && imageUploadError}</p>
          {
            formData.imageURLs.map((url, index) => {
              return (
                <div key={url} className="sm:ml-4 flex items-center gap-4 justify-between p-3 px-6 bg-[#080F22] rounded-lg">
                  <img src={url} className='w-20 h-20 object-contain rounded-lg'/>
                  <button type='button' onClick={() => {
                    setFormData({
                    ...formData,
                      imageURLs: formData.imageURLs.filter((imageURL, i) => {
                        return i!== index;
                      })
                    });
                  }} className='text-xl border-transparent bg-red-900 bg-opacity-90 text-black rounded-lg hover:bg-black hover:text-red-700 hover:scale-110 duration-300 transition-all p-2 px-3'><i className="fa fa-trash" aria-hidden="true"></i></button>
                </div>
              )
            })
          }
          <button disabled={loading || uploading} className="text-center border-transparent text-teal-500 text-xl bg-green-700 bg-opacity-40  sm:ml-4 rounded-lg hover:bg-teal-500 hover:text-black hover:scale-105 duration-300 transition-all ease-in-out p-2">{loading?"Generating...":"Generate Listing"}</button>
          {error && <p className='text-red-500 mt-4 sm:ml-4'>{error}</p>}
        </div>
      </form>
    </main>
  )
}

export default CreateListing
