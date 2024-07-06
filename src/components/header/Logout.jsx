import React from "react";
import authservice from "../../appwrite/auth";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";

function Logout() {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    authservice
      .logout()
      .then(() => {
        dispatch(logout());
      })
      .finally(() => {});
  };

  <button
    className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
    onClick={logoutHandler}
  >
    Logout
  </button>;
}

export default Logout;
