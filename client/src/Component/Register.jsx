import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SchoolIcon from "@mui/icons-material/School";
import Radio from "@mui/material/Radio";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UploadButton } from "../Book/Button";
import BASEURL from "../BaseUrl";

const Register = () => {
  const [name, setName] = useState();
  const [adhar, setAdhar] = useState();
  const [mobile, setMobile] = useState();
  const [study, setStudy] = useState();
  const [dob, setDOB] = useState();
  const [address, setAddress] = useState();
  const [gender, setGender] = useState();
  const [password, setPassword] = useState();
  const [file, setFile] = useState();

  const navigate = useNavigate();

  const handleChange = (event) => {
    setGender(event.target.value);
  };

  const controlProps = (item) => ({
    checked: gender === item,
    onChange: handleChange,
    value: item,
    name: "size-radio-button-demo",
    inputProps: { "aria-label": item },
  });

  const SubmitData = async (e) => {
    e.preventDefault();

    const UserData = {
      name: name,
      adhar: adhar,
      mobile: mobile,
      study: study,
      dob: dob,
      address: address,
      gender: gender,
      password: password,
      file: file,
    };

    await axios
      .post(`${BASEURL}/user/register`, UserData, {
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Origin": `${BASEURL}`,
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        window.location.replace("/login");
      })
      .catch((res) => {
        console.log(res);
      });
  };

  return (
    <>
      <div className="bg-slate-100 flex flex-col items-center">
        <div className="flex justify-center">
          <SchoolIcon sx={{ width: 50, height: 50, objectFit: "cover" }} />
        </div>

        <div className="flex">
          <form onSubmit={SubmitData}>
            <div className="grid grid-cols-1 sm:grid-cols-2">
              <div className="p-2">
                <TextField
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
                  value={name}
                  size="small"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="p-2">
                <TextField
                  id="outlined-basic"
                  label="Adhar number"
                  variant="outlined"
                  value={adhar}
                  size="small"
                  onChange={(e) => setAdhar(e.target.value)}
                />
              </div>

              <div className="p-2">
                <TextField
                  id="outlined-basic"
                  label="Mobile number"
                  variant="outlined"
                  size="small"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </div>

              <div className="p-2">
                <TextField
                  id="outlined-basic"
                  label="Study"
                  variant="outlined"
                  value={study}
                  size="small"
                  onChange={(e) => setStudy(e.target.value)}
                />
              </div>

              <div className="p-2">
                <TextField
                  id="outlined-basic"
                  label="DOB"
                  variant="outlined"
                  size="small"
                  value={dob}
                  onChange={(e) => setDOB(e.target.value)}
                />
              </div>

              <div className="p-2">
                <TextField
                  id="outlined-basic"
                  label="Password"
                  variant="outlined"
                  size="small"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="p-2">
                <div className="flex md:justify-center md:items-center">
                  <UploadButton fileData={setFile} />
                </div>
              </div>

              <div className="p-2 flex">
                <div>
                  <Radio {...controlProps("male")} size="small" />
                  <span>Male</span>
                </div>
                <div>
                  <Radio {...controlProps("female")} size="small" />
                  <span>Female</span>
                </div>
              </div>
            </div>

            <div className="p-2">
              <TextField
                fullWidth
                value={address}
                label="Address"
                id="fullWidth"
                multiline
                onChange={(e) => setAddress(e.target.value)}
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
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
