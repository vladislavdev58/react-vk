import React from 'react'
import './PhotoGalleryMain.scss'

const PhotoGalleryMain = ({arPosts, activeIndexImg, prevSlide, nextSlide, openModal}) => {
  return (
    arPosts[activeIndexImg] ? (
      <div className="photo-gallery__main">
        <div onClick={() => prevSlide()} className="photo-gallery__main_scrolling prev"></div>
        <div onClick={() => nextSlide()} className="photo-gallery__main_scrolling next"></div>
        <img onClick={() => openModal()} className="photo-gallery__main_img"
             src={arPosts[activeIndexImg].attachments[0].photo.photo_604} alt=""/>
      </div>
    ) : (null)
  )
}

export default PhotoGalleryMain