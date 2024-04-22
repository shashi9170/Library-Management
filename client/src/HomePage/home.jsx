import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import { Authentic, ResetAuthenticData } from "../Redux/AuthData/Auth";

import HeroSection from "../Component/Hero_section";
import Footer from "../HeaderComponent/Footer";

export default function Home() {
  const dispatch = useDispatch();
  const [cookies, setCookies] = useCookies(["token"]);

  const FetchUserData = async () => {
    await axios
      .get("http://localhost:4000/user/registerUser", {
        withCredentials: true,
        headers: {
          Authorization: cookies.token,
          // "Access-Control-Allow-Credentials": "true",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          dispatch(Authentic(res.data.data[0]));
        } else {
          dispatch(ResetAuthenticData());
        }
      })
      .catch((err) => console.log("All Error"));
  };

  useEffect(() => {
    FetchUserData();
  }, []);

  return (
    <>
      <div>
        <HeroSection />
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}
