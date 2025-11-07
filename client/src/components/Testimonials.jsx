import React from 'react'
import { testimonialsData } from '../assets/assets'

const Testimonials = () => {
  return (
    <div className="px-6 md:px-12 lg:px-20 py-8">
      {/* Title */}
      <h1 className="text-center text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent py-5">
        Customer Testimonials
      </h1>

      {/* Testimonials Section */}
      <div className="flex flex-wrap justify-center gap-6 mt-8">
        {testimonialsData.map((item, index) => (
          <div
            key={index}
            className="w-full sm:w-80 md:w-72 lg:w-80 bg-white border rounded-xl shadow-md hover:shadow-xl hover:-translate-y-2 transform transition-all duration-300 cursor-pointer text-center p-6"
          >
            <p className="mb-4 text-gray-800 italic">{item.text}</p>
            <div className="flex flex-col items-center">
              <img
                src={item.image}
                alt={item.author}
                className="w-12 h-12 rounded-full mb-3 object-cover"
              />
              <div>
                <p className="font-semibold">{item.author}</p>
                <p className="text-sm text-gray-500">{item.jobTitle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Testimonials
