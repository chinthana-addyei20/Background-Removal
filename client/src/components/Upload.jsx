import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Upload = () => {
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
      uploadImage(file)
    }
  }

  const uploadImage = async (file) => {
    setLoading(true)
    const formData = new FormData()
    formData.append('image', file)

    try {
      const response = await fetch('http://localhost:5000/api/remove-background', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()
      if (result.success) {
        // Navigate to result page with the processed image
        navigate('/Result', { state: { imageUrl: `http://localhost:5000${result.record.url}` } })
      } else {
        alert('Failed to process image')
      }
    } catch (error) {
      console.error('Error uploading image:', error)
      alert('Error uploading image')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='pb-16'>
        {/* Title */}
        <h1 className='text-center text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent py-6 md:py-16'>See the magic. Try now</h1>

      <div className='text-center mb-24'>
                  <input type="file" accept="image/*" name="" id="upload2" hidden onChange={handleFileChange}/>
                  <label className='inline-flex gap-3 px-8 py-3.5 rounded-full cursor-pointer bg-gradient-to-r from-violet-600 to-fuchsia-500 m-auto hover:scale-105 transition-all duration-700' htmlFor="upload2">
                      <img width={20} src={assets.upload_btn_icon} alt="" />
                      <p className='text-white text-sm'>{loading ? 'Processing...' : 'Upload your image'}</p>
                  </label>
              </div>
    </div>
  )
}

export default Upload
