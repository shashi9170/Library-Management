import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ProfileLogo, Icon, ShowMenu } from "./header";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Authentic, ResetAuthenticData } from "../Redux/AuthData/Auth";

function Header() {
  const data = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();

  const FetchUserData = async () => {
    await axios
      .get("http://localhost:4000/user/registerUser", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) dispatch(Authentic(res.data.data[0]));
        else dispatch(ResetAuthenticData());
      })
      .catch((err) => console.log("Error"));
  };

  useEffect(() => {
    FetchUserData();
  }, []);

  return (
    <>
      <div className="navbar flex flex-wrap bg-base-100 border-b-[1.5px] border-[#60a3bc] sticky top-0 z-50">
        <div className="flex-none sm:hidden">
          <Icon />
        </div>

        <div className="flex-1">
          <Link className="btn btn-ghost text-xl">Library</Link>
        </div>

        <div className="sm:order-3 md:order-2 hidden sm:block">
          <ShowMenu />
        </div>

        <div className="sm:order-2 md:order-3">
          {data.flag ? (
            <ProfileLogo data={data} />
          ) : (
            <div>
              <Link to="/register" className="ml-2 text-xl">
                <button className="rounded-full px-1 hover:bg-[#38ada9] hover:text-[#ffffff]">
                  Register
                </button>
              </Link>
              |
              <Link to="/login" className="mr-2 ml-1 text-xl">
                <button className="rounded-full px-1 hover:bg-[#38ada9] hover:text-[#ffffff]">
                  Login
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Header;
