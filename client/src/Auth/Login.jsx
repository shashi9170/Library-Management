import React, { useState } from "react";
import { useCookies } from "react-cookie";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Authentic } from "../Redux/AuthData/Auth";
import BASEURL from '../BaseUrl';

const Login = () => {
  const [adhar, setAdhar] = useState();
  const [password, setPassword] = useState();
  const dispatch = useDispatch();
  const [cookie, setCookies] = useCookies(["token"]);

  const LoginForm = async (e) => {
    e.preventDefault();

    const loginData = { adhar: adhar, password: password };

    await axios
      .post(`${BASEURL}/user/login`, loginData, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        setCookies("token", res.data.token, {
          path: "/",
          expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 100),
        });
        dispatch(Authentic(res.data.data));
        window.location.replace("/");
      })
      .catch((res) => {
        console.log(res);
      });
  };

  return (
    <>
      <div className="bg-[#FFFFFF] flex">
        <form action="" onSubmit={LoginForm}>
          <div>
            <div className="p-2">
              <TextField
                id="outlined-basic"
                label="Aadhar"
                variant="outlined"
                value={adhar}
                size="small"
                onChange={(e) => setAdhar(e.target.value)}
              />
            </div>

            <div className="p-2">
              <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                value={password}
                size="small"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex justify-end">
              <div className="pr-3">
                <Button variant="contained" type="submit">
                  Login
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
