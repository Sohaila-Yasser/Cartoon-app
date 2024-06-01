// Navbar.js
import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <div className='nav'>
      <nav className="nav-bar">
        <div>
          <h3 className="header-title">
            Shehab<span className="dots">...</span>
          </h3>
        </div>
        <div className="nav-links">
          <Link href="/">Home</Link>
          <Link href="/films/page">Cartoon</Link>
          <Link href="/favorites/page">Favorites</Link>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
