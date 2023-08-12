import React from 'react'
import './styles/HeroSection.css'
import movie from './assets/movie.jpg'

const HeroSection = () => {
  return (
    <>
    <div className='hero-container'>
        <div className='left-side'>
            <h1>Cannot decide what to watch?</h1>
            <p>Tired of endlessly scrolling through streaming platforms? Our quiz-based movie picker is here to rescue your movie nights! Whether you're flying solo, having a movie night with friends, or going on a special movie date, our quick quiz will curate the perfect film for your mood and preferences. Say goodbye to decision fatigue and hello to a tailored cinematic experience!?</p>
        </div>
        <div className='right-side'>
            <div className="hero-img">
                <img src={movie} className='movie-img' alt='movie-img'></img>
            </div>
            <a href='/random-movie'>Find Your Movie</a>
        </div>
    </div>
    </>
  )
}

export default HeroSection