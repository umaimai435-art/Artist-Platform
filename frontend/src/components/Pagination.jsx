// import React from 'react'

// const Pagination = () => {
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default Pagination
import AnimatedLogo from "./AnimatedLogo";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <Link to="/">
          <AnimatedLogo />
        </Link>

        {/* other navbar items */}
      </div>
    </nav>
  );
};

export default NavBar;