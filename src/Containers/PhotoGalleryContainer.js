import React, {useState, useEffect} from 'react'
import fetchJsonp from 'fetch-jsonp'
import PhotoGalleryList from "../Components/PhotoGalleryLists/PhotoGalleryList"
import PhotoGalleryMain from "../Components/PhotoGalleryMain/PhotoGalleryMain"
import PhotoGalleryButton from "../Components/PhotoGalleryButton/PhotoGalleryButton"
import PhotoGalleryModal from "../Components/PhotoGalleryModal/PhotoGalleryModal"

const PhotoGalleryContainer = () => {

  // Загруженные данные
  const [arPosts, setArPosts] = useState(null)
  // Статус загрузки
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(null)
  //Общее количетсво постов
  const [maxElem, setMaxElem] = useState(100)
  // Количетсво рандомных постов
  const [numElems, setNumElems] = useState(60)
  // Индекс выбранной фотки
  const [activeIndexImg, setActiveIndexImg] = useState(0)
  // Отображать модалку или нет
  const [showModal, setShowModal] = useState(false)
  // Картинка для модалки
  const [modalImgSrc, setModalImgSrc] = useState(null)

  const [positionThumb, setPositionThumb] = useState(0)

  const API_TOKEN = '1ea319591ea319591ea31959d41ed532da11ea31ea319597eb0e4eafedc40287e627631';

  useEffect(() => {
    fetchJsonp(`http://api.vk.com/method/wall.get?owner_id=-38691559&count=${maxElem}&access_token=${API_TOKEN}&v=5.52`)
      .then(function (response) {
        return response.json()
      }).then(function (json) {
      console.log(json);
      // Проверяем есть ли ошибки от серва, если нет то записываем
      json.error !== undefined ? (
        setError(json.error.error_msg)
      ) : (
        setArPosts(randomPosts(json.response.items))
      )
      setIsLoaded(true)

    }).catch(function (e) {
      setError('Ошибка ' + e.name + ":" + e.message)
    })
  }, [maxElem]);


  // Функция перемешивания массива
  const shuffle = array => {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {

      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  // Достаем сколько надо элементов и возвращаем их
  const randomPosts = array => {
    const arShuffle = shuffle(array)
    const arRandom = arShuffle.slice(0, numElems)
    return arRandom
  }

  // Тут листаем превьюшки
  const nextThumb = () => {
    let thumbWidth = document.querySelector('.thumbs__list').offsetWidth
    let thumbWrap = document.querySelector('.thumbs__wrap').offsetWidth
    let maxPosition = thumbWidth - thumbWrap

    if (positionThumb < maxPosition) {
      setPositionThumb(positionThumb + 79)
      document.querySelector('.thumbs__list').style.transform = 'translate3d(-' + positionThumb + 'px, 0px, 0px)'
    }
  }

  const prevThumb = () => {
    if (positionThumb >= 1) {
      setPositionThumb(positionThumb - 79)
      document.querySelector('.thumbs__list').style.transform = 'translate3d(-' + positionThumb + 'px, 0px, 0px)'
    }
    console.log(positionThumb)
  }

  // Тык некст слайдер
  const nextSlide = () => {
    if (activeIndexImg < arPosts.length - 1) {
      setActiveIndexImg(activeIndexImg + 1)
    } else {
      setActiveIndexImg(0)
      setPositionThumb(0)
    }
    nextThumb()
  }

  // Тык обратно слайдер
  const prevSlide = () => {
    activeIndexImg !== 0 ? (
      setActiveIndexImg(activeIndexImg - 1)
    ) : (
      setActiveIndexImg(arPosts.length - 1)
    )
    prevThumb()
  }

  // Открываем модалку
  const openModal = () => {
    arPosts[activeIndexImg].attachments[0].photo.photo_1280 !== undefined ? (
      setModalImgSrc(arPosts[activeIndexImg].attachments[0].photo.photo_1280)
    ) : (
      arPosts[activeIndexImg].attachments[0].photo.photo_807 !== undefined ? (
        setModalImgSrc(arPosts[activeIndexImg].attachments[0].photo.photo_807)
      ) : (
        setModalImgSrc(arPosts[activeIndexImg].attachments[0].photo.photo_604)
      )
    )
    setShowModal(true)
  }

  return (
    <>
      <PhotoGalleryMain
        arPosts={arPosts}
        activeIndexImg={activeIndexImg}
        nextSlide={nextSlide}
        prevSlide={prevSlide}
        openModal={openModal}
      />
      <div className="thumbs">
        <PhotoGalleryButton
          onFunction={prevThumb}
          className={'btn-gallery prev'}
        />
        <PhotoGalleryList
          arPosts={arPosts}
          isLoaded={isLoaded}
          error={error}
          randomPosts={randomPosts}
          activeIndexImg={activeIndexImg}
          setActiveIndexImg={setActiveIndexImg}
        />
        <PhotoGalleryButton
          onFunction={nextThumb}
          className={'btn-gallery next'}
        />
      </div>
      <PhotoGalleryModal
        showModal={showModal}
        modalImgSrc={modalImgSrc}
        setShowModal={setShowModal}
      />
    </>
  )
}

export default PhotoGalleryContainer