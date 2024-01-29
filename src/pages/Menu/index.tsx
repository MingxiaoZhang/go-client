// src/components/Menu.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const Menu: React.FC = () => {
  return (
    <div className="w-full h-full">
      <div className="grid grid-flow-row-dense grid-cols-3 grid-rows-2 h-full">
        <Link to="/local" className="select">
          <button className="select-button">
            vs Bot
          </button>
        </Link>
        <Link to="/local" className="select">
          <button className="select-button">
            Local
          </button>
        </Link>
        <Link to="/rooms" className="select">
          <button className="select-button">
            Online
          </button>
        </Link>
        <Link to="/rules" className="select">
          <button className="select-button">
            Rules
          </button>
        </Link>
        <Link to="/" className="select">
          <button className="select-button">
            Puzzles
          </button>
        </Link>
        <Link to="/" className="select">
          <button className="select-button">
            About
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Menu;
