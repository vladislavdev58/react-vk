import React from 'react'
import PhotoGalleryItem from '../PhotoGalleryItem/PhotoGalleryItem'
import Preloader from '../Preloader/Preloader'
import './PhotoGalleryLists.scss'

const PhotoLists = ({arPosts, isLoaded, error, activeIndexImg, setActiveIndexImg}) => {
  return (
    error ? (
      <p>{error}</p>
    ) : (
      !isLoaded ? (
        <Preloader/>
      ) : (
        <div className="thumbs__wrap">
          <div className="thumbs__list">
            {arPosts.map((item, index) => (
              item.attachments[0].type === 'photo' ? (
                <PhotoGalleryItem
                  key={item.id}
                  src={item.attachments[0].photo.photo_75}
                  text={item.text}
                  id={index}
                  activeIndexImg={activeIndexImg}
                  setActiveIndexImg={setActiveIndexImg}
                />
              ) : (null)
            ))}
          </div>
        </div>
      )
    )
  )
}

export default PhotoLists