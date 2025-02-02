import React from "react";
import Header from "./components/Header";
import Home from "./menu/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./menu/About";
import Products from "./menu/Products";
import News from "./menu/News";
import Board from "./menu/Board";
import Signup from "./menu/Signup";
import Login from "./menu/Login";
import Quadstar from "./product/Quadstar";
import Magicquatturo1 from "./product/Magicquattuor1";
import Magicquatturo2 from "./product/Magicquatturo2";
import Post from "./board/Post";
import MapView from "./menu/MapView";
import BikeMap from "./menu/BikeMap";
import WritePost from "./board/WritePost";
import { AuthProvider } from "./AuthContext";
import { ThemeProvider } from "styled-components";
import theme from "./theme";
import MyPage from "./menu/MyPage";
import CompanyMyPage from "./menu/CompanyMyPage";
import JobApplication from "./board/JobApplication";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "about",
    element: <About />,
  },
  {
    path: "products",
    element: <Products />,
  },
  {
    path: "bikemap",
    element: <BikeMap />,
  },
  {
    path: "news",
    element: <News />,
  },
  {
    path: "board",
    element: <Board />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
  {
    path: "post",
    element: <Post />,
  },
  {
    path: "writePost",
    element: <WritePost />,
  },
  {
    path: "myPage",
    element: <MyPage />,
  },
  {
    path: "companyMyPage",
    element: <CompanyMyPage />,
  },
  {
    path: "application",
    element: <JobApplication />,
  },
]);

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Header />
        <RouterProvider router={router} />
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
