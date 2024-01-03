import React, {useEffect} from "react";

export default function Navbar() {
  useEffect(() => {
    let navBar = document.getElementById("navBar");
    let oldScrollY = window.scrollY;

    window.addEventListener("scroll", (e) => {
      const currentScroll = window.scrollY;

      if (oldScrollY > currentScroll) {
        navBar.classList.add("sticky");
      } else {
        navBar.classList.remove("sticky");
      }
      oldScrollY = currentScroll <= 0 ? 0 : currentScroll;
    });
  }, []);

  return (
       <div className="top-0 z-10 shadow-md" id="navBar">
    <header   
      id="includeNavbarLanding"
      className="text-gray-600 bg-green-100 body-font"
    >

      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <span className="ml-3 text-xl cursor-pointer">Spotify 2.0</span>
        </a>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <a className="mr-5 hover:text-gray-900 cursor-pointer">Home</a>
          <a className="mr-5 hover:text-gray-900 cursor-pointer">
            Your Library
          </a>
        </nav>

        <div className="dropdown inline-block relative mr-7">
          <button className="hamburger material-icons text-gray-600 mt-2">
            menu
          </button>
          <div className="dropdown-content absolute top-7 right-0  bg-white border shadow-md mt-2 py-2">
            <a
              href="#"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
            >
              Item 1
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
            >
              Item 2
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
            >
              Item 3
            </a>
          </div>
        </div>
      </div>
    </header>
    </div>
  );
  }
