import React from "react";
import { useNavigate } from "react-router-dom";
import './HeroCard.scss'

export default function HeroCard({hero}) {
  const navigate = useNavigate()
  
  return (
    <div className="hero-card" onClick={() => navigate(`/hero?id=${hero._id}`)}>
      <div className="hero-card__image">
        <img src={hero.images[0]} alt="hero image" />
      </div>
      <div className="hero-card__info">
        <p className="hero-card__alter hero-card__highlight">{hero.nickname} ({hero.real_name})</p>
        <div className="hero-card__description">
          <span className="hero-card__highlight">Description: </span> 
          {hero.origin_description.slice(0, 150) + '...'}
        </div>
        <div className="hero-card__superpowers">
          <span className="hero-card__highlight">Powers: </span> 
          {hero.superpowers.slice(0, 150) + '...'}
        </div>
        <div className="hero-card__catch-phrase">
          <span className="hero-card__highlight">Catch phrase: </span> 
          "{hero.catch_phrase.slice(0, 40) + '...'}"
        </div>
      </div>
    </div>
  )
}