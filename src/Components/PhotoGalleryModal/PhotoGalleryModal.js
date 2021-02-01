import React from 'react'
import './PhotoGalleryModal.scss'

const PhotoGalleryModal = ({showModal, modalImgSrc, setShowModal}) => {
  const backgroundImage = {
    backgroundImage: 'url(' + modalImgSrc + ')'
  }

  return (
    showModal && modalImgSrc !== undefined ? (
      <>
        <div className="photo-gallery__modal">
          <div className="photo-gallery__background" style={backgroundImage}></div>
          <img src={modalImgSrc} alt=""/>
        </div>
        <div onClick={() => setShowModal(false)} className="photo-gallery__modal_overlay"></div>
      </>
    ) : ( null )
  )
}

export default PhotoGalleryModal