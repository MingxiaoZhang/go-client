// src/components/Menu.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Menu: React.FC = () => {
  return (
    <div>
      <h1>Go Game Menu</h1>
      <ul>
        <li>
          <Link to="/play/small">Play 9 x 9</Link>
        </li>
        <li>
          <Link to="/play/medium">Play 13 x 13</Link>
        </li>
        <li>
          <Link to="/play/large">Play 19 x 19</Link>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
