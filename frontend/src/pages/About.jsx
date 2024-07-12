import React from 'react'

const About = () => {
  return (
    <>
    <div className='pt-10 pb-4 px-4 max-w-6xl mx-auto'>
      <h1 className='text-4xl font-bold text-teal-500 mb-4'>About CastleQuest</h1>
      <p className='my-4'>Welcome to <span className='text-teal-400'>CastleQuest</span>, the ultimate real estate app designed to help you find your perfect place to buy, rent, or sell. Whether you're searching for a cozy apartment, a luxurious house, or a commercial property, <span className='text-teal-400'>CastleQuest</span> offers an extensive database of listings to cater to all your needs. Our intuitive search filters allow you to narrow down your options based on price, relevancy, and amenities, ensuring you find a place that truly feels like home. With high-quality images, and detailed descriptions, you can explore potential properties from the comfort of your current residence.</p>
      <p className='my-4'><span className='text-teal-400'>CastleQuest</span> also empowers property owners by providing a seamless platform to create and manage their own listings. Easily upload photos, write compelling descriptions, and set your desired price to attract potential buyers or renters. Our user-friendly interface and advanced marketing tools ensure that your property reaches a wide audience, maximizing your chances of a successful transaction. Whether you're looking to invest, find your dream home, or sell a property, <span className='text-teal-400'>CastleQuest</span> is your trusted partner in navigating the real estate market with ease and confidence.</p>
    </div>
    <div className='pb-4 px-4 max-w-6xl mx-auto'>
      <h1 className='text-4xl font-bold text-teal-500 mb-4'>About the Developer</h1>
      <p>Hi, I am <span className="text-teal-400 italic">Dhanveer Singh</span>, a Student at <span className="text-teal-300 italic">Guru Nanak Dev University, Amritsar</span>. I am currently pursuing a Bachelor's degree in <span className="text-teal-400 italic">Computer Science</span> and I aspire to be a successful <span className="text-teal-300 italic">Web Developer</span>. This is my first <span className='text-teal-400 italic'>high-scale MERN</span> project and I will continue making more like these in the near future. Thank you for visiting &#128513;.</p>
    </div>
    <div className='pt-4 px-4 max-w-6xl mx-auto flex flex-col'>
      <h1 className='text-4xl font-bold text-teal-500 mb-4'>Socials</h1>
      <div className='flex gap-6'>
      <a href="https://www.linkedin.com/in/dhanveer-singh-466738229" target='_blank' title="LinkedIn" rel='noreferrer'><i className='fa-brands fa-linkedin hover:text-blue-500 text-4xl'></i></a>
      <a href="https://www.instagram.com/dhanveersingh23775/" target='_blank' title="Instagram" rel='noreferrer'><i className='fa-brands fa-instagram hover:text-pink-400 text-4xl'></i></a>
      <a href="https://github.com/DhanveerSingh2002" target='_blank' title="GitHub" rel='noreferrer'><i className='fa-brands fa-github hover:text-gray-500 text-4xl'></i></a>
      </div>
    </div>
    </>
  )
}

export default About
