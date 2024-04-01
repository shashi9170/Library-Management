import React from "react";

export default function Book_list() {
  return (
    <>
      <div className="mx-auto p-[15px] grid lg:grid-cols-4 sm:grid-cols-2 gap-6">
        <div className="shadow-lg text-center p-3 rounded-md hover:-translate-y-3 hover:scale-110 duration-300">
          <img src={process.env.PUBLIC_URL + "../image/library.png"} alt="" />
          <h3 className="text-lg py-2">Web Design</h3>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est soluta
            reiciendis deserunt quas excepturi aspernatur.
          </p>
        </div>

        <div className="shadow-lg text-center p-3 rounded-md">
          <img src={process.env.PUBLIC_URL + "../image/library.png"} alt="" />
          <h3 className="text-lg py-2">Web Design</h3>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est soluta
            reiciendis deserunt quas excepturi aspernatur.
          </p>
        </div>

        <div className="shadow-lg text-center p-3 rounded-md">
          <img src={process.env.PUBLIC_URL + "../image/library.png"} alt="" />
          <h3 className="text-lg py-2">Web Design</h3>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est soluta
            reiciendis deserunt quas excepturi aspernatur.
          </p>
        </div>

        <div className="shadow-lg text-center p-3 rounded-md">
          <img src={process.env.PUBLIC_URL + "../image/library.png"} alt="" />
          <h3 className="text-lg py-2">Web Design</h3>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est soluta
            reiciendis deserunt quas excepturi aspernatur.
          </p>
        </div>

        <div className="shadow-lg text-center p-3 rounded-md">
          <img src={process.env.PUBLIC_URL + "../image/library.png"} alt="" />
          <h3 className="text-lg py-2">Web Design</h3>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est soluta
            reiciendis deserunt quas excepturi aspernatur.
          </p>
        </div>

        <div className="shadow-lg text-center p-3 rounded-md">
          <img src={process.env.PUBLIC_URL + "../image/library.png"} alt="" />
          <h3 className="text-lg py-2">Web Design</h3>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est soluta
            reiciendis deserunt quas excepturi aspernatur.
          </p>
        </div>
      </div>
    </>
  );
}
