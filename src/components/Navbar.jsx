import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { clear } from "../features/user/userSlice";
import toast from "react-hot-toast";
import { IoSunnyOutline } from "react-icons/io5";
import { IoMoonOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import Weather from "./Weather";

const themes = {
  dark: "dark",
  light: "light",
};
function Navbar() {
  const user = useSelector((state) => state.currentUser);
  const product = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const logout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logout successfully");
        dispatch(clear());
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        toast.error(errorMessage);
      });
  };

  const [theme, setTheme] = useState(darkModeLocalstorage());

  function darkModeLocalstorage() {
    return localStorage.getItem("mode") || themes.light;
  }

  const handleClick = () => {
    const newTheme = theme == themes.light ? themes.dark : themes.light;
    setTheme(newTheme);
    localStorage.setItem("mode", newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className="px-10 py-2  border-b">
      <div className="navbar ">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-[15px] lg:text-xl">
            Kitchen App
          </Link>
        </div>
        <div className="flex justify-center items-center">
          <Weather />
        </div>
        <div className="flex-none">
          <div className="flex justify-end items-center ml-5">
            <label className="swap swap-rotate">
              <input
                onClick={handleClick}
                type="checkbox"
                defaultChecked={theme == "dracula" ? false : true}
              />
              <IoMoonOutline className="swap-on fill-current w-5 h-5" />
              <IoSunnyOutline className="swap-off fill-current w-5 h-5" />
            </label>
          </div>
          <Link to="/store">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn sm:mr-3 btn-ghost btn-circle">
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span className="badge badge-sm indicator-item">
                    {product.totalItems}
                  </span>
                </div>
              </div>

              <div
                tabIndex={0}
                className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"></div>
            </div>
          </Link>
          <div className="dropdown dropdown-end flex items-center px-3">
            <p className="hidden font-semibold text-sm lg:flex">
              {user.user.displayName}
            </p>

            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar">
              <div className="w-9  rounded-full">
                <img alt="user" src={user.user.photoURL} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content  mt-20 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/chart">Chart</Link>
              </li>
              <li>
                <Link to="/create">create recipe</Link>
              </li>
              <li>
                <a onClick={logout}>logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
