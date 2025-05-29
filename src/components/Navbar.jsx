import React, { useState } from 'react';
import logo from "../assets/imgs/Logo.png";
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // small screen
  const [isExpanded, setIsExpanded] = useState(false); // md+ sidebar
  const [darkMode, setDarkMode] = useState(false); // dark mode

  const toggleDarkMode = () => {
    setDarkMode(darkMode ? false : true);
    document.documentElement.classList.toggle("dark", !darkMode);
  };

  return (
    <>
      {/* Small screen sidebar overlay */}
      <div className={`fixed top-0 left-0 h-full bg-red-800 dark:bg-gray-900 text-white z-50 p-3 transition-transform duration-300 ease-in-out sm:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'} w-40`}>
        {/* Close button */}
        <div className="flex justify-end mb-4">
          <button onClick={() => setIsOpen(false)} className="text-white text-xl">
            <i className='fas fa-times'></i>
          </button>
        </div>

        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img src={logo} alt="Logo" className="w-12" />
        </div>

        {/* Navigation Links */}
        <ul className="space-y-4 font-semibold text-sm">
          <li>
            <NavLink to="/" onClick={() => setIsOpen(false)} className={({ isActive }) => isActive ? "text-black dark:text-white font-bold bg-red-500 dark:bg-gray-700 w-fit p-3 rounded-2xl" : "hover:text-black dark:hover:text-white transition"}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/Nowplaying" onClick={() => setIsOpen(false)} className={({ isActive }) => isActive ? "text-black dark:text-white font-bold bg-red-500 dark:bg-gray-700 w-fit p-3 rounded-2xl" : "hover:text-black dark:hover:text-white transition"}>
              Now Playing
            </NavLink>
          </li>
          <li>
            <NavLink to="/TopRated" onClick={() => setIsOpen(false)} className={({ isActive }) => isActive ? "text-black dark:text-white font-bold bg-red-500 dark:bg-gray-700 w-fit p-3 rounded-2xl" : "hover:text-black dark:hover:text-white transition"}>
              Top Rated
            </NavLink>
          </li>
          <li>
            <NavLink to="/WatchList" onClick={() => setIsOpen(false)} className={({ isActive }) => isActive ? "text-black dark:text-white font-bold bg-red-500 dark:bg-gray-700 w-fit p-3 rounded-2xl" : "hover:text-black dark:hover:text-white transition"}>
              WatchList
            </NavLink>
          </li>
          <li>
            <button
              onClick={toggleDarkMode}
              className="w-full text-left p-2 rounded bg-gray-700 hover:bg-gray-600 transition"
            >
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
          </li>
        </ul>
      </div>

      {/* Toggle button for small screens */}
      <div className="sm:hidden fixed top-4 left-1 z-50">
        <button onClick={() => setIsOpen(true)} className="text-white text-xl bg-red-800 dark:bg-gray-900 p-2 rounded">
          <i className="fas fa-bars"></i>
        </button>
      </div>

      {/* Sidebar for md+ screens */}
      <div className={`hidden sm:flex flex-col fixed top-0 left-0 h-full bg-red-800 dark:bg-gray-900 text-white transition-all duration-300 z-40 ${isExpanded ? 'w-64' : 'w-16'}`}>
        {/* Toggle button */}
        <div className="flex justify-end p-4 ">
          <button onClick={() => setIsExpanded(!isExpanded)} className="text-white text-xl">
            <i className="fas fa-bars"></i>
          </button>
        </div>

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Logo" className={`transition-all duration-300 ${isExpanded ? 'w-16' : 'w-10'}`} />
        </div>

        {/* Navigation Links */}
        <ul className="space-y-6 px-4 font-semibold">
          <li>
            <NavLink to="/" className={({ isActive }) => isActive ? "text-black dark:text-white font-bold bg-red-500 dark:bg-gray-700 w-fit p-3 rounded-2xl" : "hover:text-black dark:hover:text-white transition"}>
              {isExpanded ? "Home" : <i className="fas fa-home"></i>}
            </NavLink>
          </li>
          <li>
            <NavLink to="/Nowplaying" className={({ isActive }) => isActive ? "text-black dark:text-white font-bold bg-red-500 dark:bg-gray-700 w-fit p-3 rounded-2xl" : "hover:text-black dark:hover:text-white transition"}>
              {isExpanded ? "Now Playing" : <i className="fas fa-play-circle"></i>}
            </NavLink>
          </li>
          <li>
            <NavLink to="/TopRated" className={({ isActive }) => isActive ? "text-black dark:text-white font-bold bg-red-500 dark:bg-gray-700 w-fit p-3 rounded-2xl" : "hover:text-black dark:hover:text-white transition"}>
              {isExpanded ? "Top Rated" : <i className="fa-solid fa-star"></i>}
            </NavLink>
          </li>
          <li>
            <NavLink to="/WatchList" className={({ isActive }) => isActive ? "text-black dark:text-white font-bold bg-red-500 dark:bg-gray-700 w-fit p-3 rounded-2xl" : "hover:text-black dark:hover:text-white transition"}>
              {isExpanded ? "WatchList" : <i className="fas fa-list"></i>}
            </NavLink>
          </li>
          <li>
            <button
              onClick={toggleDarkMode}
              className="w-fit rounded-xl text-left p-2  bg-gray-900 hover:bg-gray-600 transition"
            >
              {isExpanded ? (darkMode ? 'Light Mode' : 'Dark Mode') : <i className="fas fa-adjust"></i>}
            </button>
          </li>
        </ul>
      </div>

      {/* Page content padding based on sidebar width */}
      <div className={`transition-all duration-300 ${isExpanded ? 'sm:ml-64' : 'sm:ml-16'}`}>
        {/* Main content goes here */}
      </div>
    </>
  );
}
