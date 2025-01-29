import logo from "../assets/logo.svg";
import hamburger from "../assets/hamburger.svg";
import close from "../assets/close.svg";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  const user = useSelector((state) => state.user?.user?.data);
  const { avatar, username } = user || {};

  return (
    <div className="bg-blue-900 flex sticky top-0 w-full items-center justify-between px-4 py-3">
      {/* Hamburger Menu */}
      <div className="grid-cols-1 cursor-pointer z-10">
        <button onClick={handleClick}>
          <img src={hamburger} alt="Menu" className="h-6" />
        </button>

        {/* Sidebar */}
        {open && (
          <ul className="z-10 absolute top-0 left-0 bg-blue-800 opacity-95 p-5 h-screen w-[200px] md:w-1/4 text-white font-bold transition duration-500 ease-in-out">
            {/* Sidebar Header */}
            <li className="flex items-center justify-between mb-6 border-b border-gray-500 pb-4">
              <div className="flex items-center space-x-4">
                <img
                  src={avatar}
                  alt="User Avatar"
                  className="h-12 w-12 rounded-full border-2 border-white"
                />
                <div>
                  <p className="font-semibold">{username || "Guest"}</p>
                </div>
              </div>
              <button onClick={handleClick}>
                <img src={close} className="h-6" alt="Close Menu" />
              </button>
            </li>

            {/* Sidebar Links */}
            <li className="cursor-pointer hover:underline">
              <NavLink
                onClick={handleClick}
                to="/"
                className={({ isActive }) =>
                  isActive ? "text-red-400" : "inactive"
                }
              >
                Home
              </NavLink>
            </li>
            <li className="cursor-pointer hover:underline">
              <NavLink
                onClick={handleClick}
                to="/lobby"
                className={({ isActive }) =>
                  isActive ? "text-red-400" : "inactive"
                }
              >
                Lobby
              </NavLink>
            </li>
            <li className="cursor-pointer hover:underline">
              <NavLink
                onClick={handleClick}
                to="/Dashboard"
                className={({ isActive }) =>
                  isActive ? "text-red-400" : "inactive"
                }
              >
                Dashboard
              </NavLink>
            </li>
            <li className="cursor-pointer hover:underline">
              <NavLink
                onClick={handleClick}
                to="/About"
                className={({ isActive }) =>
                  isActive ? "text-red-400" : "inactive"
                }
              >
                About
              </NavLink>
            </li>
            <li className="cursor-pointer hover:underline">
              <NavLink
                onClick={handleClick}
                to="/Help"
                className={({ isActive }) =>
                  isActive ? "text-red-400" : "inactive"
                }
              >
                Help
              </NavLink>
            </li>
            <li className="cursor-pointer hover:underline">
              <NavLink
                onClick={handleClick}
                to="/profile"
                className={({ isActive }) =>
                  isActive ? "text-red-400" : "inactive"
                }
              >
                Profile
              </NavLink>
            </li>
            <li className="cursor-pointer hover:underline">
              <NavLink
                onClick={handleClick}
                to="/chat"
                className={({ isActive }) =>
                  isActive ? "text-red-400" : "inactive"
                }
              >
                chat
              </NavLink>
            </li>
          </ul>
        )}
      </div>

      {/* Main Header Title */}
      <div className="text-white font-bold text-lg">TicTacToe</div>

      {/* User Profile in Header */}
      <div className="flex items-center space-x-4">
        <img
          src={avatar}
          alt="User Avatar"
          className="h-10 w-10 rounded-full border-2 border-white"
        />
        <p className="text-white font-medium hidden sm:block">
          {username || "Guest"}
        </p>
        <img src={logo} alt="Logo" className="h-10" />
      </div>
    </div>
  );
};

export default Header;
