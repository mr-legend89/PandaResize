import React from 'react';
import { Link } from 'react-router-dom';
import './CustomHeader.css';

function CustomHeader() {
  return (
    <header className="custom-header">
      <h1>PDF Tools</h1>
      <nav>
        <Link to="/">Upload</Link>
        <Link to="/merge">Merge</Link>
        <Link to="/split">Split</Link>
        <Link to="/compress">Compress</Link>
        <Link to="/convert">Convert</Link>
      </nav>
    </header>
  );
}

export default CustomHeader;
