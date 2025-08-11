import React from 'react'
import basketball from "../assets/basketball.gif"


function Navbar() {
  return (
    <div>
<header className="bg-white py-4 px-10 flex justify-between items-center">
  {/* Left: Logo with GIF */}
  <div className="flex items-center space-x-2">
    <img
      src="src/assets/basketball.gif"
      alt="Basketball"
      className="w-14 h-14"
    />
    <div className="text-2xl font-bold tracking-wide text-blue-500 uppercase">
      QuickCourt
    </div>
  </div>

  {/* Center: Book */}
  <div className="text-xl font-bold text-black tracking-wide uppercase">
    Book
  </div>

  {/* Right: Buttons */}
  <div className="flex space-x-4">
    <button
      type="button"
      className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
    >
      Login
    </button>
    <button
      type="button"
      className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
    >
      Signup
    </button>
  </div>
</header>

    </div>
  )
}

export default Navbar
