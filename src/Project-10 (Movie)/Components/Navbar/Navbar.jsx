import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';
import { useDarkMode } from '../../../context/DarkModeContext';
import Loader from '../../Components/Loader/Loader';

const Navbar = ({ resetPagination }) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuActive((prev) => !prev);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearch(query);
    navigate(query.trim() ? `/?search=${encodeURIComponent(query)}` : '/');
  };

  const handleLinkClick = (path) => {
    if (path === "/") {
      setSearch(""); // Clear search input
      resetPagination(); // Reset pagination to page 1

      if (location.pathname === "/") {
        window.location.reload(); // Reload only if already on home
      } else {
        navigate("/", { replace: true });
      }
      return;
    }

    setLoading(true);
    setTimeout(() => {
      navigate(path);
      setLoading(false);
    }, 1000);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <nav className={`navbar ${isDarkMode ? 'dark' : ''}`}>
      <Link className="logo animated-logo" to="/" onClick={() => handleLinkClick('/')}>
        🎞️ ScreenTrail
      </Link>

      {loading && <Loader />}

      <div className={`menu ${isMenuActive ? 'active' : ''}`}>
        <label htmlFor="search"></label>
        <input
          type="text"
          id="search"
          name="search"
          placeholder="Search for a movie"
          value={search}
          onChange={handleSearchChange}
          className="search-input"
        />
        <ul>
          <li><Link to="/" onClick={() => handleLinkClick('/')}>Home</Link></li>
          <li><Link to="/about" onClick={() => handleLinkClick('/about')}>About</Link></li>
          <li><Link to="/contact" onClick={() => handleLinkClick('/contact')}>Contact</Link></li>
        </ul>
      </div>

      <div className="menu-toggle" onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>

      <button className="logout-btn" onClick={handleLogout}>Logout</button>

      <button onClick={toggleDarkMode} className="dark-mode-toggle">
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
    </nav>
  );
};

export default Navbar;
