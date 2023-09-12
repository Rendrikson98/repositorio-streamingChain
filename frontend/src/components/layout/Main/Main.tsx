import React from "react";
import { Routes, Route } from 'react-router-dom';

import Home from "../../../views/Home/Home";
import Channel from "../../../views/Channel/Channel";
import VideoPage from "../../../views/VideoPage/VideoPage";
import NotFound from "../../../views/NotFound/NotFound";

import './Main.css';

function Main() {
  return (
    <main className="main">
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/channel" element={<Channel />}/>
          <Route path="/video" element={<VideoPage />}/>
          <Route path="*" element={<NotFound />}/>
        </Routes>
    </main>
  );
}

export default Main;
