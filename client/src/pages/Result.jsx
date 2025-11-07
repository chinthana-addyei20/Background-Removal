import React, { useState } from 'react'
import { assets } from '../assets/assets'

const Result = () => {
  const [originalImage, setOriginalImage] = useState(assets.image_w_bg)
  const [bgRemovedImage, setBgRemovedImage] = useState(assets.image_wo_bg)

  // Open file explorer to pick a new original image
  const handleTryAnother = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = (e) => {
      const file = e.target.files[0]
      if (file) {
        const url = URL.createObjectURL(file)
        setOriginalImage(url)
        // You can also process the image to remove background here if needed
      }
    }
    input.click()
  }

  // Download the background removed image
  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = bgRemovedImage
    link.download = 'background_removed.png'
    link.click()
  }

  return (
    <div className='bg-white min-h-screen flex items-center justify-center p-8'>
      {/* White Sheet */}
      <div className='flex gap-8 w-full max-w-6xl bg-white p-6 rounded-lg shadow-md'>
        
        {/* Original Image */}
        <div className='flex-1 flex flex-col items-center'>
          <p className='text-xl font-semibold mb-4'>Original</p>
          <img 
            src={originalImage} 
            alt="Original" 
            className='w-full h-96 object-contain rounded-lg shadow-sm'
          />
        </div>

        {/* Background Removed Image */}
        <div className='flex-1 flex flex-col items-center'>
          <p className='text-xl font-semibold mb-4'>Background Removed</p>
          <img 
            src={bgRemovedImage} 
            alt="Background Removed" 
            className='w-full h-96 object-contain rounded-lg shadow-sm'
          />

          {/* Buttons */}
          <div className='flex gap-4 mt-6'>
            {/* Simple button without animation */}
            <button 
              onClick={handleTryAnother} 
              className='px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg'
            >
              Try Another Image
            </button>

            {/* Download button with blue animation */}
            <button 
              onClick={handleDownload} 
              className='px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300'
            >
              Download Image
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Result
