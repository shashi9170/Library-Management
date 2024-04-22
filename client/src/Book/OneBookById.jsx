import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Authentic, ResetAuthenticData } from "../Redux/AuthData/Auth";
import BASEURL from '../BaseUrl';

export function OneBookById() {
  const UserData = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();

  const { id } = useParams();
  const [auth, setAuth] = useState(null);
  const [secret, setSecret] = useState();
  const [bookId, setBookId] = useState();
  const [userId, setUserId] = useState();
  const [issue, setIssue] = useState(null);
  const [Bookdata, setData] = useState(null);
  const [URL, setURL] = useState();
  const [open, setOpen] = useState(null);
  const [openURL, setOpenURL] = useState(null);
  const [cookie, setCookies] = useCookies(["token"]);

  const FetchUserData = async () => {
    await axios
      .get(`${BASEURL}/user/registerUser`, {
        withCredentials: true,
        headers: {
          Authorization: cookie.token,
        },
      })
      .then((res) => {
        dispatch(Authentic(res.data.data[0]));
        setUserId(res.data.data[0]._id);
      })
      .catch((err) => console.log("Error"));
  };

  const FetchData = async () => {
    await axios
      .get(`${BASEURL}/book/${id}`, { withCredentials: false })
      .then((res) => setData(res.data.book))
      .catch((err) => console.log("Book : Error"));
  };

  const HadleFormData = async (e) => {
    e.preventDefault();

    const data = { Uid: userId, Bid: bookId };
    await axios
      .post(`${BASEURL}/issue/issuebook`, data, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: cookie.token,
        },
      })
      .then((res) => setIssue(res.data.message))
      .catch((res) => setIssue(res.response.data.message));
  };

  const HadleURLFormData = (e) => {
    e.preventDefault();

    const URLData = { Uid: userId, Bid: bookId, url: URL };

    axios
      .post(`${BASEURL}/URL/link`, URLData, {
        withCredentials: false,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log("Link : error"));
  };

  useEffect(() => {
    FetchData(id);
    setBookId(id);
  }, []);

  return (
    <>
      {Bookdata && (
        <div className="p-2 bg-base-100 shadow-xl md:mx-20 sm:shadow-none">
          <div className="flex flex-col sm:flex-row mb-2">
            <div className="p-2">
              <img
                className="w-full h-[100%] md:w-[400px] md:h-[200px]"
                src={`${BASEURL}/books/${Bookdata.file}`}
                alt="Shoes"
              />
            </div>

            <div className="md:ml-10">
              <div>
                Handbook of Physics (English, Paperback, Bhatnagar Nipendra)
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
                FetchUserData();
                setOpen("true");
                document.getElementById("my_modal_3").showModal();
              }}
              className="rounded-full px-3 py-1 bg-[#1976d2] text-[#ffffff]"
            >
              Issue
            </button>

            <button
              onClick={() => {
                setOpenURL("true");
                document.getElementById("my_modal").showModal();
              }}
              className="ml-2 rounded-full px-2 py-1 bg-[#1976d2] text-[#ffffff]"
            >
              Add link
            </button>
          </div>
        </div>
      )}

      <dialog id="my_modal_3" className="modal">
        {auth === null
          ? open && (
              <div className="modal-box md:w-[30%] sm:w-[40%] bg-gradient-to-r from-blue-500">
                {issue && <div className="flex justify-center">{issue}</div>}
                <div className="flex justify-center">
                  <form
                    method="dialog"
                    className="flex flex-col items-end"
                    onSubmit={HadleFormData}
                  >
                    <div className="m-1">
                      <TextField
                        id="outlined-basic"
                        label="Secret key"
                        variant="outlined"
                        type="password"
                        size="small"
                        value={secret}
                        onChange={(e) => setSecret(e.target.value)}
                      />
                    </div>

                    <div className="m-1">
                      <TextField
                        id="outlined-basic"
                        value={bookId}
                        variant="outlined"
                        size="small"
                      />
                    </div>

                    <div className="m-1">
                      <TextField
                        id="outlined-basic"
                        value={userId}
                        variant="outlined"
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
                          setOpen(null);
                          setIssue(null);
                        }}
                      >
                        Close
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )
          : auth && (
              <div className="modal-box w-[20%] flex justify-center">
                <span className="py-2 pr-1">{auth}</span>
                <span className="mt-2 pl-1">
                  <Link className="underline" to="/login">
                    Login
                  </Link>
                </span>
              </div>
            )}
      </dialog>

      <dialog id="my_modal" className="modal">
        {openURL && (
          <div className="modal-box md:w-[30%] sm:w-[40%] bg-gradient-to-r from-blue-500">
            <div className="flex justify-center">
              <form
                method="dialog"
                className="flex flex-col items-end"
                onSubmit={HadleURLFormData}
              >
                <div className="m-1">
                  <TextField
                    id="outlined-basic"
                    label="URL"
                    variant="outlined"
                    size="small"
                    value={URL}
                    onChange={(e) => setURL(e.target.value)}
                  />
                </div>

                <div className="m-1">
                  <TextField
                    id="outlined-basic"
                    value={bookId}
                    variant="outlined"
                    size="small"
                  />
                </div>

                <div className="m-1">
                  <TextField
                    id="outlined-basic"
                    value={userId}
                    variant="outlined"
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
                      setOpenURL(null);
                      document.getElementById("my_modal").close();
                    }}
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
