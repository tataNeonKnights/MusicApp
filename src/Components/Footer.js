import React from "react";

export default function Footer() {
  return (
    // <!-- Footer imported by tailBlocks and made many changes to meet our desired output-->
    <>
      <div className="px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col overflow-hidden">
        <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left md:mt-0 mt-10">
          <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
            <span className="text-xl">Spotify-Clone</span>
          </a>
          <p className="mt-2 text-sm text-gray-500">
            Air plant banjo lyft occupy retro adaptogen indego
          </p>
        </div>
        <div className="flex-grow flex flex-wrap md:pr-20 -mb-10 md:text-left text-center order-first">
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
              CATEGORIES
            </h2>
            <nav className="list-none mb-10">
              <li>
                <a className="text-gray-600 hover:text-gray-800 cursor-pointer">
                  First Link
                </a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-800 cursor-pointer">
                  Second Link
                </a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-800 cursor-pointer">
                  Third Link
                </a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-800 cursor-pointer">
                  Fourth Link
                </a>
              </li>
            </nav>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
              CATEGORIES
            </h2>
            <nav className="list-none mb-10">
              <li>
                <a className="text-gray-600 hover:text-gray-800 cursor-pointer">
                  First Link
                </a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-800 cursor-pointer">
                  Second Link
                </a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-800 cursor-pointer">
                  Third Link
                </a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-800 cursor-pointer">
                  Fourth Link
                </a>
              </li>
            </nav>
          </div>

          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
              CATEGORIES
            </h2>
            <nav className="list-none mb-10">
              <li>
                <a className="text-gray-600 hover:text-gray-800 cursor-pointer">
                  First Link
                </a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-800 cursor-pointer">
                  Second Link
                </a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-800 cursor-pointer">
                  Third Link
                </a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-800 cursor-pointer">
                  Fourth Link
                </a>
              </li>
            </nav>
          </div>
        </div>
      </div>
      <div className="bg-gray-100 py-4 px-5">
        <p className="text-gray-500 text-sm text-center sm:text-left">
          © 2023 Spotify Clone
        </p>
      </div>
    </>
  );
}
