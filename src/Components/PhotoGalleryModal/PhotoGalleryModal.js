import React from 'react'
import './PhotoGalleryModal.scss'

const PhotoGalleryModal = ({modalImgSrc, setShowModal}) => {
  const backgroundImage = {
    backgroundImage: 'url(' + modalImgSrc + ')'
  }

  return (
      <>
        <div className="photo-gallery__modal">
          <div className="photo-gallery__background" style={backgroundImage}></div>
          <img src={modalImgSrc} alt=""/>
        </div>
        <div onClick={() => setShowModal(false)} className="photo-gallery__modal_overlay"></div>
      </>
  )
}

export default PhotoGalleryModal