import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <header className="bg-white  py-4 px-10 flex justify-between items-center">
      {/* Logo */}
      <div className="text-2xl font-semibold tracking-wide text-indigo-500 uppercase">
        QuickCourt
      </div>

      {/* Title */}
      <div className="text-xl font-medium uppercase text-black">Book</div>

      {/* Auth Buttons */}
      <div className="flex items-center space-x-4">
        <Link
          to="/Signup"
          
        >
          <h2 className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 
                     hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 
                     dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign</h2>
        </Link>


        <Link
          to="/Login"
          
        >
          <h2 className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 
                     hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 
                     dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Login</h2>
        </Link>
      </div>
    </header>
  );
}

export default Navbar;