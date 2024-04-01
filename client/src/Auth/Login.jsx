import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Authentic } from "../Redux/AuthData/Auth";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [resp, setResp] = useState(null);
  const [reg, setReg] = useState(null);
  const dispatch = useDispatch();

  const LoginForm = async (e) => {
    e.preventDefault();

    const loginData = { email: email, password: password };

    await axios
      .post("http://localhost:4000/user/login", loginData, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          dispatch(Authentic(res.data.data));
          navigate(`/`);
        } else if (res.status === 202) {
          setResp(null);
          setReg("Please register");
        } else {
          setReg(null);
          setResp("Please fill all the field");
        }
      })
      .catch((res) => {
        console.log(res);
      });
  };

  return (
    <>
      {resp && <p>{resp}</p>}
      {reg && (
        <div>
          <span>{reg}</span> <Link to="/register" className="underline text-blue-800">Register</Link>
        </div>
      )}

      <div className="bg-[#FFFFFF] flex">
        <form action="" onSubmit={LoginForm}>
          <div>
            <div className="p-2">
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                value={email}
                size="small"
                onChange={(e) => setEmail(e.target.value)}
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

            <div className="flex float-right">
              <div className="pr-3">
                <Button variant="contained" type="submit">
                  Save
                </Button>
              </div>

              <div>
                <Button variant="contained">Cancel</Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
