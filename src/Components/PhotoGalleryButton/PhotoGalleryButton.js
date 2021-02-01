import React from 'react'
import './PhotoGalleryButton.scss'
import arrowImg from './arrow.svg'

const PhotoGalleryButton = ({onFunction, className}) => {
  return(
    <button onClick={() => onFunction()} className={className}><img src={arrowImg} alt=""/></button>
  )
}

export default PhotoGalleryButton