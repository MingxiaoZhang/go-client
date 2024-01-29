// src/components/Sidebar.tsx
import React, { useState } from 'react';
import { FaHome, FaInfoCircle, FaEnvelope } from 'react-icons/fa';
import { BiChevronRight, BiChevronLeft } from 'react-icons/bi';
import "./style.css";
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`flex flex-col h-full bg-[#352F44] text-[#FAF0E6] p-4 ${isExpanded ? 'w-48' : 'w-16'}`}>
        <div className='flex-none'>
          <Link to="/">
            <h2 className="text-2xl font-bold m-4">Play GO</h2>
          </Link>
          <nav className='flex justify-center'>
            <ul>
              <li className="side-item">
                <Link to="/local">
                  {isExpanded ? 'Play Local' : <FaHome size={24}/>}
                </Link>
              </li>
              <li className="side-item">
                <Link to="/rooms">
                  {isExpanded ? 'Play Online' : <FaHome size={24}/>}
                </Link>
              </li>
              <li className="side-item">
                <Link to="/rules">
                  {isExpanded ? 'Rules' : <FaHome size={24}/>}
                </Link>
              </li>
              <li className="side-item">
                <Link to="/local">
                  {isExpanded ? 'Play Local' : <FaHome size={24}/>}
                </Link>
              </li>
              <li className="side-item">
                <Link to="/local">
                  {isExpanded ? 'Play Local' : <FaHome size={24}/>}
                </Link>
              </li>
              <li className="side-item">
                <Link to="/local">
                  {isExpanded ? 'Play Local' : <FaHome size={24}/>}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      <div className="flex-1" />
      <div className="flex-none">
        <button
          className="p-2 text-blue-500 focus:outline-none"
          onClick={toggleSidebar}
        >
          {isExpanded ? 'Collapse' : <BiChevronRight />}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
