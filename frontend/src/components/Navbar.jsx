import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdMenu } from "react-icons/md";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLogin = window.localStorage.getItem("isLogin");
  const user_type = window.localStorage.getItem("user_type");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div>
      <div className="bg-[#00ABE4]  h-[50px] flex justify-between items-center px-4 lg:px-10 text-white">
        <div className="one">
          <nav>
            <ul className="flex items-center gap-10">
              <li>
                <Link to={user_type === 'student' ? '/Check-schedule' : (user_type === 'admin' ? '/admin-dashboard' : "/Teaceher-Dashboard")}>
                  <span className="text-red-700 text-2xl">Teacher</span>  Office appointment booking
                </Link>
              </li>
          

              {isLogin && (
                <div className=" hidden lg:flex   lg:gap-x-10 items-center">
                  {user_type === "student" && (
                    <>
                    
                     <li>
                        <Link to="/Check-schedule">Check schedule</Link>
                      </li>
                      <li>
                        <Link to="/Booked-list">Booked schedule</Link>
                      </li>
                    
                      <li className="">
                        <Link to="/student-profile">Profile</Link>
                      </li>
                     
                    </>
                  )}

                  {user_type === "teacher" && (
                    <>
                      <li>
                        <Link to="/Teaceher-Dashboard">Dashboard</Link>
                      </li>
                      <li>
                        <Link to="/manage-schedule">Manage schedule</Link>
                      </li>
                      <li>
                        <Link to="/Booked-schedules">Booked schedule</Link>
                      </li>
                      <li>
                        <Link to="/teacher-profile">Profile</Link>
                      </li>
                    </>
                  )}

                  {user_type === "admin" && (
                    <>
                      <li>
                        <Link to="/admin-dashboard">Dashboard</Link>
                      </li>
                      <li>
                        <Link to="/manage-teacher">Manage teachers</Link>
                       
                      </li>
                      <li>
                      <Link to="/admin-profile">Profile</Link>
                       
                      </li>
                    </>
                  )}
                </div>
              )}
            </ul>
          </nav>
        </div>

        <div className="two">
          <nav className="">
            <ul className="flex">
              {isLogin ? (
                <>
                  <li className="lg:hidden cursor-pointer" onClick={toggleMenu}>
                    <MdMenu size={40} color="" />
                  </li>
                  {/* <li className="hidden lg:block ml-auto">
                    <Link to="/profile">Profile</Link>
                  </li> */}
                </>
              ) : (
                <>
                  <li className="px-4">
                    <Link to="/register">Register</Link>
                  </li>
                  <li className="px-4">
                    <Link to="/login">Login</Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden   w-screen h-[190px] p-4">
          <nav>
            <ul>
              {isLogin && (
                <>
                  {user_type === "student" && (
                    <>
                      <li className="py-2">
                        <Link onClick={closeMenu} to="/Check-schedule">Check schedule</Link>
                      </li>
                      <li className="py-2">
                        <Link onClick={closeMenu} to="/Booked-list">Booked schedule</Link>
                      </li>
                    
                      <li className="py-2">
                        <Link onClick={closeMenu} to="/student-profile">Profile</Link>
                      </li>
                    </>
                  )}

                  {user_type === "teacher" && (
                    <>
                      <li className="py-2">
                        <Link onClick={closeMenu} to="/Teaceher-Dashboard">Dashboard</Link>
                      </li>
                      <li className="py-2">
                        <Link onClick={closeMenu} to="/manage-schedule">Manage schedule</Link>
                      </li>
                      <li className="py-2">
                        <Link onClick={closeMenu} to="/Booked-schedules">Booked schedule</Link>
                      </li>
                      <li className="py-2">
                        <Link onClick={closeMenu} to="/teacher-profile">Profile</Link>
                      </li>
                    </>
                  )}

                  {user_type === "admin" && (
                    <>
                     <li className="py-2">
                        <Link onClick={closeMenu} to="/admin-dashboard">Dashboard</Link>
                      </li>
                      <li className="py-2">
                        <Link onClick={closeMenu} to="/manage-teacher">Manage teachers</Link>
                       
                      </li>
                      <li className="py-2">
                      <Link onClick={closeMenu} to="/admin-profile">Profile</Link>
                       
                      </li>
                    </>
                  )}

                  <li>
                    {/* <Link to="/profile" onClick={closeMenu}>
                      Profile
                    </Link> */}
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}

export default Navbar;
