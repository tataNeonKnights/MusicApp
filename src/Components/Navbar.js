import React, { useEffect, useState } from "react";

export default function Navbar() {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

    return (
    <header   
      id="includeNavbarLanding"
      className={`text-gray-600 body-font z-10 shadow-md ${
        isSticky ? 'sticky-nav' : ''
      }`}
    >
       <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-bold items-center text-gray-900 font-sans mb-4 md:mb-0">
          <span className="ml-3 text-2xl cursor-pointer">Spotify 2.0</span>
        </a>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <a className="mr-5 hover:text-gray-950 cursor-pointer font-semibold text-xl font-sans">Home</a>
          <a className="mr-5 hover:text-gray-950 cursor-pointer font-semibold text-xl font-sans">Your Library</a>
        </nav>
        
        <div className="dropdown inline-block relative mr-7">
          <button className="hamburger material-icons text-gray-600 mt-2">
            menu
          </button>
          <div className="dropdown-content absolute top-7 right-0  bg-white border shadow-md mt-2 py-2">
            <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
              Item 1
            </a>
            <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
              Item 2
            </a>
            <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
              Item 3
            </a>
          </div>
        </div>
      </div>  
</header>
    );
}
      
      
      






