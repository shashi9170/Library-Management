import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import Axios from "axios";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ResetAuthenticData, Authentic } from "../Redux/AuthData/Auth";
import BASEURL from "../BaseUrl";

export default function ProfileOfOneUser() {
  const [bookData, setBookData] = useState([]);
  const [RBook, setRBook] = useState();
  const [Return, setReturn] = useState(null);
  const [id, setId] = useState();
  const [issueBook, setIssueBook] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cookie, setCookies, removeToken] = useCookies(["token"]);
  const data = useSelector((state) => state.AuthReducer);

  const FetchUserData = async () => {
    await Axios.get(`${BASEURL}/user/profile`, {
      withCredentials: true,
      headers: {
        Authorization: cookie.token,
      },
    })
      .then((res) => {
        dispatch(Authentic(res.data.user));
        setId(res.data.user._id);
        FetchIssueBookData(res.data.user._id);
      })
      .catch((res) => console.log("Error"));
  };

  const FetchIssueBookData = async (UserId) => {
    await Axios.get(`${BASEURL}/issue/issueAllbook/${UserId}`, {
      withCredentials: true,
      headers: {
        Authorization: cookie.token,
      },
    })
      .then((res) => {
        setBookData(res.data.book);
      })
      .catch((res) => console.log("student Error ", res));
  };

  const BookReturnRenual = (Bid) => {
    const book = bookData.filter((data) => data.BookId === Bid);
    setRBook(book);
  };

  const ReturnBook = async (e) => {
    e.preventDefault();

    const book = { Uid: RBook[0].UserId, Bid: RBook[0].BookId };

    await Axios.post(`${BASEURL}/issue/return`, book, {
      withCredentials: false,
      headers: {
        Authorization: cookie.token,
      },
    })
      .then((res) => {
        if (res.data.Ret) {
          FetchIssueBookData(id);
        }
        setReturn(res.data.message);
      })
      .catch((err) => console.log("Error"));
  };

  useEffect(() => {
    FetchUserData();
  }, []);

  const LogOutFromWeb = async () => {
    removeToken(["token"]);
    window.location.replace("/login");
  };

  return (
    <>
      {data && (
        <div className="grid grid-cols-1 md:grid-cols-3 md:mx-15 mt-2 sm:mx-10 mx-2 md:gap-x-5 gap-y-5 bg-[#f0f3f5] p-2">
          <div className="flex md:flex-col justify-between bg-[#ffffff]">
            <div className="h-full w-full flex p-1 rounded flex-col">
              <div className="flex md:justify-start mb-2">
                <Avatar
                  sx={{ width: 110, height: 105 }}
                  src={`${data.image}`}
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
              <button
                onClick={() =>
                  document.getElementById("my_modal_4").showModal()
                }
                className="px-1 py-1 mr-auto hover:bg-[#82ccdd] rounded hover:text-[#ffffff]"
              >
                Return
              </button>
              <Link to="/allStudent">
                <button className="px-1 py-1 mr-auto hover:bg-[#82ccdd] rounded hover:text-[#ffffff]">
                  Student
                </button>
              </Link>
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
              {bookData.length !== 0 ? (
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
                      <td className="px-2 py-2">
                        {data.issueDate
                          .substring(0, 10)
                          .split("-")
                          .reverse()
                          .join("-")}
                      </td>
                      <td className="px-2 py-2">
                        {data.issueDate
                          .substring(0, 10)
                          .split("-")
                          .reverse()
                          .join("-")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              ) : (
                issueBook && (
                  <tbody>
                    <tr>
                      <td>{issueBook}</td>
                    </tr>
                  </tbody>
                )
              )}
            </table>
          </div>
        </div>
      )}
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          {bookData &&
            bookData.map((data, i) => (
              <div
                key={i}
                className="p-2 bg-base-100 shadow-xl md:mx-20 sm:shadow-none"
              >
                <div className="flex flex-col sm:flex-row mb-2">
                  <div className="p-2">
                    <img
                      className="w-full h-[30%] md:w-[200px] sm:h-[150px]"
                      src={`${BASEURL}/books/${data.file}`}
                      alt="Shoes"
                    />
                  </div>

                  <div className="md:ml-10">
                    <div>
                      Handbook of Physics (English, Paperback, Bhatnagar
                      Nipendra)
                    </div>
                    <div>Edition</div>
                    <div>Available</div>

                    <div className="flex items-center">
                      <svg
                        className="w-4 h-4 text-yellow-300 ms-1"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <svg
                        className="w-4 h-4 text-yellow-300 ms-1"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <svg
                        className="w-4 h-4 text-yellow-300 ms-1"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <svg
                        className="w-4 h-4 text-yellow-300 ms-1"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <svg
                        className="w-4 h-4 ms-1 text-gray-300 dark:text-gray-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>

                      <span className="pl-2">7,378 Ratings</span>
                    </div>
                  </div>
                </div>

                <div className="flex">
                  <button
                    onClick={() => {
                      BookReturnRenual(data.BookId);
                      document.getElementById("my_modal_3").showModal();
                    }}
                    className="rounded-full px-3 py-1 bg-[#1976d2] text-[#ffffff]"
                  >
                    Return
                  </button>

                  <button className="ml-2 rounded-full px-2 py-1 bg-[#1976d2] text-[#ffffff]">
                    Renual
                  </button>
                </div>
              </div>
            ))}

          <button
            onClick={() => document.getElementById("my_modal_4").close()}
            className="btn"
          >
            Close
          </button>
        </div>
      </dialog>

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box md:w-[30%] sm:w-[40%] bg-gradient-to-r from-blue-500">
          {RBook && (
            <>
              {Return && <div className="flex justify-center">{Return}</div>}
              <div className="flex justify-center">
                <form
                  method="dialog"
                  className="flex flex-col items-end"
                  onSubmit={ReturnBook}
                >
                  <div className="m-1">
                    <TextField
                      id="outlined-basic"
                      label="Secret key"
                      variant="outlined"
                      type="password"
                      size="small"
                    />
                  </div>

                  <div className="m-1">
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      value={RBook[0].UserId}
                      size="small"
                    />
                  </div>

                  <div className="m-1">
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      value={RBook[0].BookId}
                      size="small"
                    />
                  </div>

                  <div className="flex justify-end m-1">
                    <button
                      className="rounded px-3 py-1 bg-[#1976d2] text-[#ffffff]"
                      type="submit"
                    >
                      Confirm
                    </button>

                    <button
                      className="rounded px-3 py-1 bg-[#1976d2] text-[#ffffff] ml-2"
                      type="button"
                      onClick={() => {
                        document.getElementById("my_modal_3").close();
                        setReturn(null);
                      }}
                    >
                      Close
                    </button>
                  </div>
                </form>
              </div>
            </>
          )}
        </div>
      </dialog>
    </>
  );
}
