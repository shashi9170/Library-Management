import React, { useState} from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SchoolIcon from "@mui/icons-material/School";
import axios from "axios";
import BASEURL from '../BaseUrl';

import { UploadButton } from "./Button";

export default function Upload() {
  const [subject, setSubject] = useState();
  const [author, setAuthor] = useState();
  const [item, setItem] = useState();
  const [edition, setEdition] = useState();
  const [price, setPrice] = useState();
  const [content, setContent] = useState();
  const [file, setFile] = useState();

  const UploadBookData = async (e) => {
    e.preventDefault();

    const BookData = {
      subject: subject,
      author: author,
      edition: edition,
      price: price,
      item: item,
      file: file,
    };

    console.log(BookData);

    axios
      .post(
        `${BASEURL}/book/upload`,
        BookData,
        { withCredentials: false },
        {
          headers: { "content-type": "multipart/form-data" },
        }
      )
      .then((res) => console.log(res))
      .catch((res) => console.log("Error : ", "Error"));
  };

  return (
    <>
      <div className=" flex flex-col items-center bg-slate-100">
        <div className="flex justify-center">
          <SchoolIcon sx={{ width: 50, height: 50, objectFit: "cover" }} />
        </div>

        <div className="flex">
          <form onSubmit={UploadBookData}>
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-2">
                <TextField
                  id="outlined-basic"
                  label="Subject"
                  variant="outlined"
                  size="small"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>

              <div className="p-2">
                <TextField
                  id="outlined-basic"
                  label="Author"
                  variant="outlined"
                  size="small"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />
              </div>

              <div className="p-2">
                <TextField
                  id="outlined-basic"
                  label="price"
                  variant="outlined"
                  size="small"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div className="p-2">
                <TextField
                  id="outlined-basic"
                  label="Edition"
                  variant="outlined"
                  size="small"
                  value={edition}
                  onChange={(e) => setEdition(e.target.value)}
                />
              </div>

              <div className="p-2">
                <TextField
                  id="outlined-basic"
                  label="Number of item"
                  variant="outlined"
                  size="small"
                  value={item}
                  onChange={(e) => setItem(e.target.value)}
                />
              </div>

              <div className="p-2">
                <div className="flex md:justify-center md:items-center">
                  <UploadButton fileData={setFile} />
                </div>
              </div>
            </div>

            <div className="p-2">
              <TextField
                fullWidth
                label="About book"
                id="fullWidth"
                multiline
                value={content}
                onChange={(e) => setContent(e.target.value)}
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
}
