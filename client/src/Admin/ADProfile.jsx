import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { Avatar } from "@mui/material";

import { removeCookie } from "../Cookie/cookie";

export default function ADProfile() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [bookData, setBookData] = useState([]);

  const FetchUserData = async () => {
    await Axios.get(`http://localhost:4000/user/admin/${id}`, {
      withCredentials: true,
    })
      .then((res) => setData(res.data.user))
      .catch((res) => console.log("Error"));
  };

  const FetchIssueBookData = async () => {
    await Axios.get(`http://localhost:4000/book`, { withCredentials: true })
      .then((res) => setBookData(res.data.book))
      .catch((res) => console.log("Error"));
  };

  useEffect(() => {
    FetchUserData();
    FetchIssueBookData();
  }, []);

  const LogOutFromWeb = () => {
    removeCookie("token");
    window.location.replace("/");
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 md:mx-15 mt-2 sm:mx-10 mx-2 md:gap-x-5 gap-y-5 bg-[#f0f3f5] p-2">
        <div className="flex md:flex-col justify-between bg-[#ffffff]">
          <div className="h-full w-full flex p-1 rounded flex-col">
            <div className="flex md:justify-start mb-2">
              <Avatar
                sx={{ width: 110, height: 105 }}
                src={process.env.PUBLIC_URL + `../student/${data.image}`}
              />
            </div>

            <div>
              <div>ID : {data._id}</div>
              <div>User name : {data.name}</div>
              <div>Email : shashi@gmail.com</div>
            </div>
          </div>
          <hr />
          <div className="flex flex-col mt-1">
            <button className="px-1 py-1 mr-auto hover:bg-[#82ccdd] rounded hover:text-[#ffffff]">
              Service
            </button>
            <button className="px-1 py-1 mr-auto hover:bg-[#82ccdd] rounded hover:text-[#ffffff]">
              Add book
            </button>
            <button className="px-1 py-1 mr-auto hover:bg-[#82ccdd] rounded hover:text-[#ffffff]">
              Edit
            </button>
            <button
              className="px-1 py-1 mr-auto hover:bg-[#82ccdd] rounded hover:text-[#ffffff]"
              onClick={LogOutFromWeb}
            >
              Logout
            </button>
          </div>
        </div>

        <div className="relative overflow-x-auto bg-[#ffffff] col-span-2">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-2 py-2">
                  Subject
                </th>
                <th scope="col" className="px-2 py-2">
                  Issue Date
                </th>
                <th scope="col" className="px-2 py-2">
                  Return Date
                </th>
              </tr>
            </thead>
            {/* {bookData.length !== 0 ? (
              <tbody>
                {bookData.map((data, i) => (
                  <tr
                    key={i}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-2 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {data.Subject}
                    </th>
                    <td className="px-2 py-2">{data.issueDate}</td>
                    <td className="px-2 py-2">{data.issueDate + 10}</td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <tbody></tbody>
            )} */}
          </table>
        </div>
      </div>
    </>
  );
}
