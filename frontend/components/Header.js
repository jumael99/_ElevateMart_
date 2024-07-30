"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useLogoutMutation } from "@/store/slices/api/authApiSlice";
import { clearCredentials } from "@/store/slices/authSlice";
import { toastManager } from "@/utils/toastManager";
import { useFetchMyProfileQuery } from "@/store/slices/api/userApiSlice";
import { setUser, deleteUser } from "@/store/slices/userSlice";
import CartDropdown from "./CartDropdown";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const needFetch = !!user;
  const { data: userInformation, isError } = useFetchMyProfileQuery(undefined, {
    skip: needFetch,
  });

  const [logout, { isLoading }] = useLogoutMutation();
  const dispatch = useDispatch();

  const router = useRouter();

  useEffect(() => {
    if (user) {
      setIsUserLoggedIn(true);
    } else if (userInfo && userInformation) {
      dispatch(setUser(userInformation));
      setIsUserLoggedIn(true);
    } else {
      setIsUserLoggedIn(false);
    }
  }, [userInfo, userInformation]);

  const handleLogout = async (e) => {
    const toastId = toastManager.loading("Logging out...");
    e.preventDefault();
    try {
      await logout().unwrap();
      setIsUserLoggedIn(false);
      dispatch(deleteUser());
      dispatch(clearCredentials());

      toastManager.updateStatus(toastId, {
        render: "Logged out successfully",
        type: "success",
      });
    } catch (error) {
      const message = error?.data?.message || "Something went wrong";
      toastManager.updateStatus(toastId, {
        render: message,
        type: "error",
      });
    }
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <header>
      <nav className="bg-lightBlue-500 w-full shadow-md">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-black">
              ElevateMart
            </span>
          </a>
          <div className="flex md:order-2 items-center">
            <div className="relative hidden md:block">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="search-navbar"
                className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search..."
              />
            </div>
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-500 hover:bg-lightBlue-600 focus:outline-none focus:ring-4 focus:ring-lightBlue-300 rounded-lg text-sm p-2.5 ml-1"
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 6h14M3 12h14M3 18h14"
                />
              </svg>
              <span className="sr-only">Open main menu</span>
            </button>
            <img
              src="https://via.placeholder.com/40"
              className="w-10 h-10 rounded-full ml-4"
              alt="Profile"
            />
          </div>
          <div
            className={`w-full md:flex md:w-auto md:order-1 ${
              isMenuOpen ? "block" : "hidden"
            }`}
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-lightBlue-500 md:flex-row md:space-x-8 md:mt-0 md:border-0">
              <li>
                <Link href="/" className="block py-2 px-3 text-black rounded hover:bg-lightBlue-600 md:hover:bg-transparent md:hover:text-blue-800 md:p-0">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="block py-2 px-3 text-black rounded hover:bg-lightBlue-600 md:hover:bg-transparent md:hover:text-blue-800 md:p-0">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/services" className="block py-2 px-3 text-black rounded hover:bg-lightBlue-600 md:hover:bg-transparent md:hover:text-blue-800 md:p-0">
                  Services
                </Link>
              </li>
              {!isUserLoggedIn && (
                <>
                  <li>
                    <Link href="/login" className="block py-2 px-3 text-black rounded hover:bg-lightBlue-600 md:hover:bg-transparent md:hover:text-blue-800 md:p-0">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link href="/register" className="block py-2 px-3 text-black rounded hover:bg-lightBlue-600 md:hover:bg-transparent md:hover:text-blue-800 md:p-0">
                      Register
                    </Link>
                  </li>
                </>
              )}
              {isUserLoggedIn && (
                <li onClick={handleLogout}>
                  <Link href="#" className="block py-2 px-3 text-black rounded hover:bg-lightBlue-600 md:hover:bg-transparent md:hover:text-blue-800 md:p-0 hover:cursor-pointer">
                    Logout
                  </Link>
                </li>
              )}
              {isUserLoggedIn && (
                <li className="ml-6">
                  <div className="relative py-2 cursor-pointer" onClick={toggleCart}>
                    <div className="absolute top-0 right-0 flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-3 text-xs text-white">
                      {cart && cart.cart ? cart.cart.length : 0}
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-6 w-6 text-black"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                      />
                    </svg>
                  </div>
                  <CartDropdown isOpen={isCartOpen} toggleCart={toggleCart} />
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;