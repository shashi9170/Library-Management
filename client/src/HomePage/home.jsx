import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import { Authentic, ResetAuthenticData } from "../Redux/AuthData/Auth";
import BASEURL from "../BaseUrl";

import HeroSection from "../Component/Hero_section";
import Footer from "../HeaderComponent/Footer";

export default function Home() {
  const dispatch = useDispatch();
  const [cookies, setCookies] = useCookies(["token"]);

  const FetchUserData = async () => {
    await axios
      .get(`${BASEURL}/user/registerUser`, {
        withCredentials: true,
        headers: {
          Authorization: cookies.token,
        },
      })
      .then((res) => {
        dispatch(Authentic(res.data.data[0]));
      })
      .catch((err) => console.log("All Error "));
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
