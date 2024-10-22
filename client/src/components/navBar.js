import React, { useState } from 'react';
import '../styles/navBar.css'; // Assuming you have some CSS for styling

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginLogout = () => {
    setIsLoggedIn(!isLoggedIn);  // Toggle login/logout
  };

  return (
    <nav className="navbar">
      <ul className="nav-tabs">
        <li><a href="/home">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
      <div className="auth-buttons">
        {isLoggedIn ? (
          <button onClick={handleLoginLogout}>Logout</button>
        ) : (
          <button onClick={handleLoginLogout}>Login</button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
