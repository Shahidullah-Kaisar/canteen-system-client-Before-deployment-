import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import Home from "../pages/home/Home";
import Register from "../pages/register/Register";
import Login from "../pages/login/Login";
import Coupon from "../pages/coupon/Coupon";
import PrivateRoute from "../privateRoute/PrivateRoute";
import ShowCoupon from "../pages/showCoupon/ShowCoupon";
import Admin from "../pages/admin/Admin";
import AdminData from "../pages/adminData/AdminData";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/admin",
        element: <Admin></Admin>,
      },
      {
        path: "/adminData",
        element: <AdminData></AdminData>,
        loader: ()=> fetch('https://canteen-system-server-373v7q163.vercel.app/coupon')
      },
      
      {
        path: "/coupon",
        element: (
          <PrivateRoute>
            <Coupon></Coupon>
          </PrivateRoute>
        ),
      },
      {
        path: "/showcoupon",
        element: (
          <PrivateRoute>
            <ShowCoupon></ShowCoupon>
          </PrivateRoute>
        ),
        loader: () =>
          fetch("https://canteen-system-server-373v7q163.vercel.app/coupon"),
      },
    ],
  },
]);

export default router;
