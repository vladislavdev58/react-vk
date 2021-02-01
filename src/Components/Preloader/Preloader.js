import React from 'react'
import './Preloader.scss'
import preloader from './Preloader.svg'

const Preloader = () => (
  <img className="preloader" src={preloader} alt=""/>
)

export default Preloader;