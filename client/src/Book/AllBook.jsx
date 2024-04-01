import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Authentic, ResetAuthenticData } from "../Redux/AuthData/Auth";


export default function AllBook() {
  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [head, setHead] = useState();
  const st = new Set();
  st.add("All");

  const FilterDataByUser = (Subject) => {
    if (Subject === "All") {
      setData(filterData);
    } else {
      const filt = filterData.filter((d) => d.Subject === Subject);
      setData(filt);
    }
  };

  const FetchUserData = async () => {
    await axios
      .get("http://localhost:4000/user/registerUser", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          dispatch(Authentic(res.data.data[0]));
        } else {
          dispatch(ResetAuthenticData());
        }
      })
      .catch((err) => console.log("Error"));
  };

  const FetchData = async () => {
    await axios
      .get("http://localhost:4000/book/allbook", { withCredentials: false })
      .then((res) => {
        setData(res.data.book);
        setFilterData(res.data.book);
        res.data.book.map((data) => st.add(data.Subject));
        setHead([...st]);
      })
      .catch((err) => console.log("AllBook : Error"));
  };

  useEffect(() => {
    FetchUserData();
    FetchData();
  }, []);

  return (
    <>
      <div className="flex justify-center sticky z-50 top-16 bg-[#b0c4de] p-1">
        {head &&
          head.map((data, i) => (
            <div className="px-2 mx-1" key={i}>
              <button type="button" onClick={() => FilterDataByUser(data)}>
                {data}
              </button>
            </div>
          ))}
      </div>
      <div className="p-2 bg-base-100 shadow-xl md:mx-20 sm:shadow-none grid grid-cols-1 sm:grid-cols-4 gap-3">
        {data &&
          data.map((data, i) => (
            <Link to={data._id} key={i}>
              <div className="flex flex-col mb-2">
                <div className="p-2">
                  <img
                    className="w-full h-[100%] md:w-[400px] md:h-[200px]"
                    src={`http://localhost:4000/books/${data.file}`}
                    alt="Shoes"
                  />
                </div>

                <div className="ml-2">
                  <div>
                    Handbook of Physics (English, Paperback, Bhatnagar Nipendra)
                  </div>
                  <div>Edition</div>
                  <div>Number of item : {data.NoOfItem}</div>
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
            </Link>
          ))}
      </div>
    </>
  );
}
