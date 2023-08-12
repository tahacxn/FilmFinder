import React from 'react'
import './styles/Footer.css'
import { MdMovie } from 'react-icons/md';

const Footer = () => {
  return (
    <>
    <footer>
        <div className="logo">
            <MdMovie className="logo-icon" />
            <span className="logo-text">FilmFinder</span>
        </div>
      <p>&copy;Copyright 2023 - FilmFinder.com</p>
      <div>
        <ul>
          <li><a href='/'>Home</a></li>
        </ul>
      </div>
    </footer>
    </>
  )
}

export default Footer