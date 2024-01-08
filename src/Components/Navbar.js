import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [searchSongName, setSearchSongName] = useState("");
  const [searchOpens, setSearchOpens] = useState(false);
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
  const handleOnChange = (e) => {
    setSearchSongName(e.target.value);
  };

  const searchNavSize = () => {
    if (searchOpens === false) {
      const searchBox = document.getElementById("homeSearch");
      searchBox.classList.remove("w-6");
      searchBox.classList.add("w-40");
      searchBox.classList.remove("hidden");
      setSearchOpens(true);
    } else if (searchOpens === true && searchSongName.length > 0) {
      console.log("Searching in the database");
    } else {
      const searchBox = document.getElementById("homeSearch");
      searchBox.classList.remove("w-40");
      searchBox.classList.add("w-6");
      searchBox.classList.add("hidden");
      setSearchOpens(false);
    }
  };

  try {
    return (
      <div className="top-0 z-10 shadow-md" id="navBar">
        <header
          id="includeNavbarLanding"
          className="text-gray-600 bg-green-100 body-font"
        >
          <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
            <NavLink
              to="/"
              className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
            >
              <span className="text-xl cursor-pointer">MusicApp</span>
            </NavLink>

            <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
              <input
                type="text"
                id="homeSearch"
                name="name"
                className=" bg-white opacity-70 h-9 w-6 hidden rounded-3xl border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 ease-in-out "
                placeholder="Enter songs name"
                value={searchSongName}
                onChange={(e) => handleOnChange(e)}
              />

              <div className="group relative inline-block">
                <span
                  className="select-none material-symbols-outlined rounded-full p-1 cursor-pointer m-2"
                  id="navSearchBar"
                  onClick={searchNavSize}
                >
                  search
                </span>
              </div>
              <NavLink
                to="/"
                className="mr-5 hover:text-gray-900 cursor-pointer"
              >
                Home
              </NavLink>
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
  } catch (error) {
    console.log("some error occured");
  }
}
