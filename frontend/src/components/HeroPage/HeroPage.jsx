import React, {useEffect, useState} from "react"
import './HeroPage.scss'
import {useNavigate, useSearchParams} from 'react-router-dom'
import {getHero, deleteHero} from '../../api/api'

import deleteBtn from '../../assets/delete.svg'
import editBtn from '../../assets/edit.svg'

import Loader from "../Loader/Loader"
import ImageGallery from 'react-image-gallery'

export default function HeroPage() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const [data, setData] = useState()
  const [images, setImages] = useState(null)
  const [isPending, setPending] = useState(true)

  const handleEdit = () => {
    navigate(`/change-hero?id=${params.get('id')}`)
  }

  const handleDelete = () => {
    deleteHero(params.get('id'))
    navigate('/')
  }

  useEffect(() => {
    getHero(params.get('id')).then(response => {
      setData(response.data)
      let imgs = []
      response.data[0].images.map(url => {
        imgs.push({original: url, thumbnail: url})
      })
      setImages(imgs)
      setPending(false)
    })
  }, [])

  return (
    <>
      {
        isPending
        ? <Loader />
        : <>
          <div className="hero-page">
            <div className="hero-page__wrapper">
            <div className="hero-page__btns">
              <button className="hero-page__btn delete-btn" onClick={handleDelete}>
                <img src={deleteBtn} className="hero-page__btn-delete" alt="delete" />
              </button>
              <button className="hero-page__btn edit-btn" onClick={handleEdit}>
                <img src={editBtn} className="hero-page__btn-edit" alt="edit" />
              </button>
            </div>
              {/* <div className="hero-page__img">
                <img src={data[0].images[0]} alt="hero" />
              </div> */}
              <div className="hero-page__info">
                {images ? <ImageGallery originalWidth={1000} originalHeight={560} items={images} /> : <></>}
                <h1 className="hero-page__info-alter">{data[0].nickname}</h1>
                <section className="hero-page__info-section">
                  <p className="hero-page__info-section-p">Real name - <span>{data[0].real_name}</span></p>
                  <p className="hero-page__info-section-p">Catch phrase - <span>{data[0].catch_phrase}</span></p>
                  <h2 className="hero-page__info-title">Description</h2>
                  <div className="hero-page__info-section-p"><span>{data[0].origin_description}</span></div>
                  <h2 className="hero-page__info-title">Powers</h2>
                  <div className="hero-page__info-section-p"><span>{data[0].superpowers}</span></div>
                </section>
              </div>
            </div>
          </div>
        </>
      }
    </>
  )
}