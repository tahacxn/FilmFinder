import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { MdMovie } from 'react-icons/md';
import './styles/NavBar.css'

const NavBar = () => {
    const navRef = useRef();

	const showNavbar = () => {
		navRef.current.classList.toggle(
			"responsive_nav"
		);
	};
  return (
    <>
    <header>
        <div className="logo">
            <MdMovie className="logo-icon" />
            <span className="logo-text">FilmFinder</span>
        </div>
        <nav ref={navRef}>
            <ul>
                <li><a href='/'>Home</a></li>
                <li><a href='/FilmFinder'>Find A Movie</a></li>
            </ul>
            <button
					className="nav-btn nav-close-btn"
					onClick={showNavbar}>
					<FaTimes />
				</button>
        </nav>
        <button
				className="nav-btn"
				onClick={showNavbar}>
				<FaBars />
			</button>
    </header>
    </>
  )
}

export default NavBar