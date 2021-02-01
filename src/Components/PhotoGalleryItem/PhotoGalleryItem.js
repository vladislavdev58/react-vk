import React from 'react'

const PhotoGalleryItem = ({src, text, id, activeIndexImg, setActiveIndexImg}) => {
  return(
    <img onClick={() => setActiveIndexImg(id)} className={activeIndexImg === id ? 'active' : null} src={src} alt={text}/>
  )
}

export default PhotoGalleryItem