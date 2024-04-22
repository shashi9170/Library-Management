import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { Avatar } from "@mui/material";
import { useCookies } from "react-cookie";
import BASEURL from "../BaseUrl";

export default function Student() {
  const [image, setImage] = useState([]);
  const [cookies, setCookies] = useCookies(["token"]);

  useEffect(() => {
    Axios.get(`${BASEURL}/user/allStudent`, {
      withCredentials: true,
      headers: {
        Authorization: cookies.token,
      },
    }).then((res) => setImage(res.data.user));
  }, [!image]);

  return (
    <>
      <div>
        {image.map((data) => (
          <>
            <Link to={data._id}>
              <div className="mx-5 pt-2">
                <div className="p-8 grid grid-cols-1 divide-y bg-[#CAD3C8] rounded-md">
                  <div className="grid md:grid-cols-2 grid-cols-1 pb-3 md:divide-x divide-y">
                    <div className="flex">
                      <div className="pr-5">
                        <Avatar
                          sx={{ width: 56, height: 56 }}
                          src={`${data.image}`}
                        />
                      </div>
                      <div className="grid">
                        <div>Name {data.name}</div>
                        <div>Email {data.email}</div>
                      </div>
                    </div>

                    <div className="px-5">{data.name}</div>
                  </div>

                  <div className="pt-2">{data.email}</div>
                </div>
              </div>
            </Link>
          </>
        ))}
      </div>
    </>
  );
}
