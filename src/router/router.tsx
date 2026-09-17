import { createBrowserRouter } from "react-router";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Advertise from "../pages/Advertise/Advertise";

import NotFound from "../pages/NotFound/NotFound";

import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import MyPage from "../pages/MyPage/MyPage";
import News from "../pages/News/News";
import SearchResult from "../pages/SearchResult/SearchResult";
import EditProfile from "../pages/EditProfile/EditProfile";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/news",
        element: <News />,
      },
      {
        path: "/searchresult",
        element: <SearchResult />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/mypage",
            element: <MyPage />,
          },
          {
            path: "/mypage/editprofile",
            element: <EditProfile />
          },
          {
            path: "/advertise",
            element: <Advertise />,
          },
        ],
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
