import React, {useState, useEffect} from 'react'
import fetchJsonp from 'fetch-jsonp'
import PhotoGalleryMain from '../Components/PhotoGalleryMain/PhotoGalleryMain'
import PhotoGalleryModal from '../Components/PhotoGalleryModal/PhotoGalleryModal'
import PhotoGalleryThumb from '../Components/PhotoGalleryThumb/PhotoGalleryThumb'
import Preloader from '../Components/Preloader/Preloader'

const PhotoGalleryContainer = () => {
  // Список пабликов
  // const [groupList, setGroupList] = useState([38691559, 45595714, 49131654])
  // Загруженные данные
  const [arPosts, setArPosts] = useState([])
  // Статусы загрузки
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(null)
  //Общее количетсво постов
  const [maxElem, setMaxElem] = useState(100)
  // Индекс выбранной фотки
  const [activeIndexImg, setActiveIndexImg] = useState(0)
  // Отображать модалку или нет
  const [showModal, setShowModal] = useState(false)
  // Картинка для модалки
  const [modalImgSrc, setModalImgSrc] = useState(null)

  const [positionThumb, setPositionThumb] = useState(0)

  useEffect(() => {
    const API_TOKEN = '1ea319591ea319591ea31959d41ed532da11ea31ea319597eb0e4eafedc40287e627631'

    fetchJsonp(`http://api.vk.com/method/wall.get?owner_id=-38691559&count=${maxElem}&access_token=${API_TOKEN}&v=5.52`)
      .then((response) => {
        return response.json()
      }).then((json) => {
      console.log(json);
      // Проверяем есть ли ошибки от серва, если нет то записываем
      json.error ? (
        setError(json.error.error_msg)
      ) : (
        setArPosts(randomPosts(json.response.items))
      )
      setIsLoaded(true)
    }).catch((e) => {
      setError('Ошибка ' + e.name + ":" + e.message)
    })
  }, [maxElem]);

  useEffect(() => {
    const thumbs = document.querySelector('.thumbs__list')
    if (thumbs) {
      thumbs.style.transform = 'translate3d(-' + positionThumb + 'px, 0px, 0px)'
    }
  }, [positionThumb])


  // Функция перемешивания массива
  const shuffle = array => {
    if (maxElem > 100) {
      setError('Вы указали отображаемое кол-во постов больше, чем у нас есть')
      return array
    }
    let currentIndex = array.length, temporaryValue, randomIndex

    while (0 !== currentIndex) {

      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex -= 1

      temporaryValue = array[currentIndex]
      array[currentIndex] = array[randomIndex]
      array[randomIndex] = temporaryValue
    }

    return array
  }

  // Достаем сколько надо элементов и возвращаем их
  const randomPosts = array => {
    const arShuffle = shuffle(array)
    const arRandom = arShuffle.slice(0, maxElem)
    return arRandom
  }

  // Тут листаем превьюшки
  const nextThumb = () => {
    let thumbWidth = document.querySelector('.thumbs__list').offsetWidth
    let thumbWrap = document.querySelector('.thumbs__wrap').offsetWidth
    let maxPosition = thumbWidth - thumbWrap

    if (positionThumb < maxPosition) {
      setPositionThumb(positionThumb + 80)
    }
  }

  const prevThumb = () => {
    if (positionThumb >= 0) {
      setPositionThumb(positionThumb - 80)
    }
  }

  // Тык некст слайдер
  const nextSlide = () => {
    if (activeIndexImg < arPosts.length - 1) {
      setActiveIndexImg(activeIndexImg + 1)
    } else {
      setActiveIndexImg(0)
      setPositionThumb(0)
    }
    if (activeIndexImg < arPosts.length - 4)
      setPositionThumb((activeIndexImg - 2) * 80)
  }

  // Тык обратно слайдер
  const prevSlide = () => {
    if (activeIndexImg !== 0) {
      setActiveIndexImg(activeIndexImg - 1)
    } else {
      setActiveIndexImg(arPosts.length - 1)
    }
    if (activeIndexImg === 0) {
      setPositionThumb((arPosts.length - 7) * 80)
    } else if (activeIndexImg < arPosts.length - 3) {
      setPositionThumb((activeIndexImg - 4) * 80)
    }
  }

// Открываем модалку
  const openModal = () => {
    arPosts[activeIndexImg].attachments[0].photo.photo_1280 ? (
      setModalImgSrc(arPosts[activeIndexImg].attachments[0].photo.photo_1280)
    ) : (
      arPosts[activeIndexImg].attachments[0].photo.photo_807 ? (
        setModalImgSrc(arPosts[activeIndexImg].attachments[0].photo.photo_807)
      ) : (
        setModalImgSrc(arPosts[activeIndexImg].attachments[0].photo.photo_604)
      )
    )
    setShowModal(true)
  }

  return (
    error ? (
      <p>{error}</p>
    ) : (
      !isLoaded ? (
        <Preloader/>
      ) : (
        <>
          <PhotoGalleryMain
            arPosts={arPosts}
            activeIndexImg={activeIndexImg}
            nextSlide={nextSlide}
            prevSlide={prevSlide}
            openModal={openModal}
          />
          <PhotoGalleryThumb
            prevThumb={prevThumb}
            nextThumb={nextThumb}
            positionThumb={positionThumb}
            arPosts={arPosts}
            activeIndexImg={activeIndexImg}
            setActiveIndexImg={setActiveIndexImg}
          />
          <PhotoGalleryModal
            showModal={showModal}
            modalImgSrc={modalImgSrc}
            setShowModal={setShowModal}
          />
        </>
      )
    )
  )
}

export default PhotoGalleryContainer