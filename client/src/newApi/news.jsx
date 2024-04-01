import React, { useState, useEffect } from "react";
import { Avatar } from "@mui/material";
import axios from "axios";

export default function NewsApi() {
  const [newsdata, setNewsData] = useState([]);

  const FetchData = () => {
    axios
      .get(
        "https://newsapi.org/v2/top-headlines?country=in&apiKey=94377356ed79473d95828b6a9d5cc0e3",
        { withCredentials: false }
      )
      .then((res) => setNewsData(res.data.articles))
      .catch((err) => console.log("Error"));
  };

  useEffect(() => {
    FetchData();
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-x-10 p-4 gap-y-14">
        {newsdata.map((data, i) => (
          <div className="flex flex-col justify-between" key={i}>
            <div className="justify-center flex">
              {data.urlToImage != null ? (
                <Avatar
                  sx={{ width: 280, height: 200 }}
                  src={data.urlToImage}
                  variant="rounded"
                />
              ) : (
                <div></div>
              )}
            </div>
            <div className="p-2">{data.title}</div>

            <div>
              <a
                href={data.url}
                target="_blank"
                className="p-1 rounded bg-[#1976d2] text-[#ffffff]"
              >
                Read more
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
