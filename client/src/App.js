import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Header from "./HeaderComponent/body";
import Login from "./Auth/Login";
import Register from "./Component/Register";
import Student from "./User/Student";
import Upload from "./Book/Upload";
import Home from "./HomePage/home";
import ProfileOfOneUser from "./User/Profile";
import { OneBookById } from "./Book/OneBookById";
import AllBook from "./Book/AllBook";
import OneStudentProfile from "./User/OneStudentProfile";
import NewsApi from "./newApi/news";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/uploadBook" element={<Upload />} />
        <Route path="/news" element={<NewsApi />} />
        <Route path="/allStudent" element={<Student />} />
        <Route path="/allStudent/:id" element={<OneStudentProfile />} />
        <Route path="/profile" element={<ProfileOfOneUser />} />
        <Route path="/allBook" element={<AllBook />} />
        <Route path="/allBook/:id" element={<OneBookById />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
