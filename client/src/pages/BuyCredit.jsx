import React from 'react'
import { assets, plans } from '../assets/assets'

const BuyCredit = () => {
  return (
    <div className='min-h-screen bg-gray-50 flex flex-col items-center py-10 px-6'>
      {/* Header Section */}
      <button className='bg-blue-500 text-white px-5 py-2 rounded-lg font-semibold shadow-sm hover:bg-blue-600 transition duration-300'>
        Our Plans
      </button> 

      <h1 className='text-2xl md:text-3xl font-bold text-gray-800 mt-4 mb-10 text-center'>
        Choose the Plan that's right for you
      </h1>

      {/* Plans Section */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl'>
        {plans.map((item, index) => (
          <div 
            key={index}
            className='bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300 flex items-center gap-4'
          >
            {/* Logo on the left */}
            <img 
              width={50} 
              src={assets.logo_icon} 
              alt="plan logo" 
              className='flex-shrink-0'
            />

            {/* Text content centered */}
            <div className='flex-1 flex flex-col items-center text-center'>
              <p className='text-lg font-semibold text-gray-800 mb-1'>
                {item.id}
              </p>

              <p className='text-gray-500 text-sm mb-2'>
                {item.desc}
              </p>

              <p className='text-xl font-bold text-blue-600'>
                ${item.price}
                <span className='text-gray-600 text-base font-medium'> / {item.credits} credits</span>
              </p>

              <button className='mt-4 bg-blue-500 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-600 transition duration-300'>
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BuyCredit

