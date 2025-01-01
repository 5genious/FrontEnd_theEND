import React from 'react'
import fstsImage from '../assets/images/fstsImage.jpg'

const ImageScreenBlur = () => {
  return (
    <div className="absolute w-[100%] h-[100vh] z-[-99] top-0">
      <div className="absolute bg-black/50 w-full h-full"></div>
      <img src={fstsImage} alt="" className="w-full h-full blur-sm" />
    </div>
  )
}

export default ImageScreenBlur
