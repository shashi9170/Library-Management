import React from "react";
import { Link } from "react-router-dom";

export default function BookListMenu() {
  return (
    <>
      <div
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        <Link> Item1</Link>
        <Link>Item2</Link>
      </div>
    </>
  );
}
