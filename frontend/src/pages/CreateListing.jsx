import React, { useState } from 'react'
import { app } from '../FireBase';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';

const CreateListing = () => {

  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageURLs: []
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  
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

  return (
    <main className='p-4 max-w-4xl mx-auto'>
      <h1 className='text-4xl font-semibold text-center mb-8 mt-2 text-teal-400'>Create a Listing</h1>
      <form className='flex flex-col sm:flex-row gap-8'>
        <div className='flex flex-col gap-4 flex-1'>
            <input className='bg-[#080F21] text-teal-400 focus:outline-none rounded-lg p-3' type="text" id="name" placeholder='Name' required/>
            <textarea className='bg-[#080F21] text-teal-400 focus:outline-none rounded-lg p-3' type="text" id="description" placeholder='Description' required/>
            <input className='bg-[#080F21] text-teal-400 focus:outline-none rounded-lg p-3' type="text" id="address" placeholder='Address' required/>
        
        <div className="flex gap-7 flex-wrap accent-teal-400 mt-2">
          <div className="flex gap-2">
            <input className='w-5' type="checkbox" id='sell'/>
            <span className='text-[#9CA3AF]'>Sell</span>
          </div>
          <div className="flex gap-2">
            <input className='w-5' type="checkbox" id='rent'/>
            <span className='text-[#9CA3AF]'>Rent</span>
          </div>
          <div className="flex gap-2">
            <input className='w-5' type="checkbox" id='parking'/>
            <span className='text-[#9CA3AF]'>Parking Spot</span>
          </div>
          <div className="flex gap-2">
            <input className='w-5' type="checkbox" id='furnished'/>
            <span className='text-[#9CA3AF]'>Furnished</span>
          </div>
          <div className="flex gap-2">
            <input className='w-5' type="checkbox" id='offer'/>
            <span className='text-[#9CA3AF]'>Offer</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 text-teal-400">
          <div className="flex items-center gap-2">
            <input placeholder='0' className='w-16 p-3 rounded-lg bg-[#080F21] border-teal focus:outline-none' type="number" id="bedrooms" required min={1} max={10}/>
            <p className='text-[#9CA3AF]'>Bedrooms</p>
          </div>
          <div className="flex items-center gap-2">
            <input placeholder='0' className='w-16 p-3 rounded-lg bg-[#080F21] border-teal focus:outline-none' type="number" id="bathrooms" required min={1} max={10}/>
            <p className='text-[#9CA3AF]'>Bathrooms</p>
          </div>
          <div className="flex items-center gap-2 mt-4">
            <input placeholder='0' className='w-24 p-3 rounded-lg bg-[#080F21] border-teal focus:outline-none' type="number" id="regularPrice" />
            <div className="flex flex-col items-center">
              <p className='text-[#9CA3AF]'>Regular Price</p>
              <span className='text-xs text-[#9CA3AF]'>(₹/month)</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input placeholder='0' className='w-24 p-3 rounded-lg bg-[#080F21] border-teal focus:outline-none' type="number" id="discountedPrice" />
            <div className="flex flex-col items-center">
              <p className='text-[#9CA3AF]'>Discounted Price</p>
              <span className='text-xs text-[#9CA3AF]'>(₹/month)</span>
            </div>
          </div>
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
                <div key={url} className="ml-4 flex items-center gap-4 justify-between p-3 px-6 bg-[#080F22]">
                  <img src={url} className='w-16 h-20 object-contain'/>
                  <button type='button' onClick={() => {
                    setFormData({
                    ...formData,
                      imageURLs: formData.imageURLs.filter((imageURL, i) => {
                        return i!== index;
                      })
                    });
                  }} className='text-xl border-transparent bg-red-700 text-black rounded-lg hover:bg-black hover:text-red-700 hover:scale-110 duration-300 transition-all p-2 px-3'><i className="fa fa-trash" aria-hidden="true"></i></button>
                </div>
              )
            })
          }
          <button className="text-center border-transparent text-teal-500 text-xl bg-green-700 bg-opacity-40  sm:ml-4 rounded-lg hover:bg-teal-500 hover:text-black hover:scale-105 duration-300 transition-all ease-in-out p-2">Generate Listing</button>
        </div>
      </form>
    </main>
  )
}

export default CreateListing
