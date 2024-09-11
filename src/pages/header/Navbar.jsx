import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const { user, userSignOut } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = () => {
    userSignOut()
      .then(() => console.log("user SignOut"))
      .catch((error) => {
        console.log(error);
      });
      
    setIsMenuOpen(false); // Close menu after sign out
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false); // Close the menu when a link is clicked
  };

  const navLinks = (
    <>
      <li className="mr-8 text-2xl">
        <NavLink to="/" onClick={closeMenu}>Home</NavLink>
      </li>

      {user && user.emailVerified && (
        <li className="mr-8 text-2xl">
          <NavLink to="/coupon" onClick={closeMenu}>Buy Coupon</NavLink>
        </li>
      )}
      {user && user.emailVerified && (
        <li className="mr-8 text-2xl">
          <NavLink to="/showcoupon" onClick={closeMenu}>Your Coupon</NavLink>
        </li>
      )}
      {user && user.emailVerified ? (
        <li className="mr-8 text-2xl">
          <NavLink to="/login" onClick={() => { handleSignOut(); closeMenu(); }}>
            Logout
          </NavLink>
        </li>
      ) : (
        <li className="mr-8 text-2xl">
          <NavLink to="/login" onClick={closeMenu}>Login</NavLink>
        </li>
      )}
      {user && user.emailVerified ? (
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="rounded-full">
              <img
                alt=""
                src={user.photoURL}
              />
            </div>
          </div>
        </div>
      ) : (
        <li className="mr-8 text-2xl">
          <NavLink to="/register" onClick={closeMenu}>Register</NavLink>
        </li>
      )}
      <li className="mr-8 text-2xl">
        <NavLink to="/admin">Admin</NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-transparent p-5">
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden"
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <FaTimes className="h-5 w-5" />
            ) : (
              <FaBars className="h-5 w-5" />
            )}
          </div>
          {isMenuOpen && (
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {navLinks}
            </ul>
          )}
        </div>
        <a className="btn btn-ghost text-3xl">Buy Your Coupon</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </div>
    </div>
    
  );
};

export default Navbar;
