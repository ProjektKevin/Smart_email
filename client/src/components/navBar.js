import React, { useState } from 'react';
import '../styles/navBar.css'; // Assuming you have some CSS for styling
import Tabs from './tabs'; // Import the Tabs component

const NavBar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLoginLogout = () => {
        setIsLoggedIn(!isLoggedIn);
    };

    return (
        <nav className="navbar">
            {/* Render the Tabs component inside the NavBar */}
            <Tabs />
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