import React from 'react'
import PhotoGalleryButton from '../PhotoGalleryButton/PhotoGalleryButton'
import PhotoGalleryList from '../PhotoGalleryLists/PhotoGalleryList'

const PhotoGalleryThumb = ({prevThumb, nextThumb, positionThumb, arPosts, randomPosts, activeIndexImg, setActiveIndexImg }) => {
  return (
    <div className="thumbs">
      <PhotoGalleryButton
        onFunction={prevThumb}
        className={'btn-gallery prev'}
        positionThumb={positionThumb}
      />
      <PhotoGalleryList
        arPosts={arPosts}
        randomPosts={randomPosts}
        activeIndexImg={activeIndexImg}
        setActiveIndexImg={setActiveIndexImg}
      />
      <PhotoGalleryButton
        onFunction={nextThumb}
        className={'btn-gallery next'}
      />
    </div>
  )
}

export default PhotoGalleryThumb