import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import Home from "../pages/home/Home";
import Register from "../pages/register/Register";
import Login from "../pages/login/Login";
import Coupon from "../pages/coupon/Coupon";
import PrivateRoute from "../privateRoute/PrivateRoute";
import ShowCoupon from "../pages/showCoupon/ShowCoupon";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
      children:[
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
          path: "/coupon",
          element: <PrivateRoute><Coupon></Coupon></PrivateRoute>,
        },
        {
          path: "/showCoupon",
          element: <PrivateRoute><ShowCoupon></ShowCoupon></PrivateRoute>,
          loader: ()=> fetch('http://localhost:5000/coupon')
        },
      ]
    },
  ]);

  export default router;