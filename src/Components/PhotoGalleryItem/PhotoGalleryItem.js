import React from 'react'
import './PhotoGalleryItem.scss'

const PhotoGalleryItem = ({src, id, activeIndexImg, setActiveIndexImg}) => {
  const backgroundImage = {
    backgroundImage: 'url(' + src + ')'
  }
  return(
    <div onClick={() => setActiveIndexImg(id)} className={`thumbs__list_item ${activeIndexImg === id ? 'active' : ""}`} style={backgroundImage}></div>
  )
}

export default PhotoGalleryItem