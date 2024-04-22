import React, { useState} from "react";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import BASEURL from "../BaseUrl";

export function Icon() {
  const [flag, setFlag] = useState(false);

  const DropDownPop = () => {
    setFlag(!flag);
  };

  return (
    <div className="dropdown bg-[#ffffff]">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle"
        onClick={DropDownPop}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h7"
          />
        </svg>
      </div>
      {flag ? (
        <div
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-[9px] z-[1] shadow bg-base-100 rounded-box w-[600%]"
        >
          <Link
            to="/"
            className="mx-2 text-xl py-1 rounded-full px-1 hover:bg-[#38ada9] hover:text-[#ffffff]"
            onClick={DropDownPop}
          >
            <button className="">Home</button>
          </Link>

          <Link
            to="news"
            className="mx-2 text-xl py-1 rounded-full px-1 hover:bg-[#38ada9] hover:text-[#ffffff]"
            onClick={DropDownPop}
          >
            <button className="">News</button>
          </Link>

          <Link
            to="allBook"
            className="mx-2 text-xl py-1 rounded-full px-1 hover:bg-[#38ada9] hover:text-[#ffffff]"
            onClick={DropDownPop}
          >
            <button className="">Books</button>
          </Link>

          <Link
            className="mx-2 text-xl py-1 rounded-full px-1 hover:bg-[#38ada9] hover:text-[#ffffff]"
            onClick={DropDownPop}
          >
            <button className="">Payment</button>
          </Link>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export function ProfileLogo(props) {

  return (
    <>
      <Link to="/profile">
        <Avatar
          sx={{ width: 40, height: 40 }}
          src={`${props.data.image}`}
        />
      </Link>
    </>
  );
}

export function ShowMenu() {
  return (
    <>
      <Link to="/" className="mx-2 text-xl">
        <button className="rounded-full px-1 hover:bg-[#38ada9] hover:text-[#ffffff]">
          Home
        </button>
      </Link>

      <Link to="news" className="mx-2 text-xl">
        <button className="rounded-full px-1 hover:bg-[#38ada9] hover:text-[#ffffff]">
          News
        </button>
      </Link>

      <Link to="allBook">
        <button className="rounded-full px-1 text-xl hover:bg-[#38ada9] hover:text-[#ffffff]">
          Books
        </button>
      </Link>

      <Link className="mx-2 text-xl">
        <button className="rounded-full px-1 hover:bg-[#38ada9] hover:text-[#ffffff]">
          Payment
        </button>
      </Link>
    </>
  );
}
