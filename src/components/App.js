import React from "react";
import Layout from "./Layouts/Layout";
import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Home from "../Pages/Home/Home";
import TweetByHashTag from "../Pages/TweetByHashTag/TweetByHashTag";
import TweetByUser from "../Pages/TweetByUser/TweetByUser";
import P404 from "../Pages/404/P404";
import Auth from "../Pages/Auth/Auth";
import { TweetProvider } from "../context/TweetContext";




const isLogin = !!localStorage.getItem('x-auth-token');

const App = () => {


  return (
    <TweetProvider>
      <Routes>
        <Route path={"/login"} element={isLogin ? <Navigate to="/" /> : <Auth />} />
        <Route path={"*"} element={<P404 />} />
        <Route path="/" element={!isLogin ? <Navigate to="/login" /> : <Layout><Home /></Layout>} />
        <Route path={"/user/:userId/:userName"} element={!isLogin ? <Navigate to="/login" /> : <Layout><TweetByUser /></Layout>} />
        <Route path={"/hashtag/:hashTagId"} element={!isLogin ? <Navigate to="/login" /> : <Layout><TweetByHashTag /></Layout>} />
      </Routes>
    </TweetProvider>
  )
}





export default App;