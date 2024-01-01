import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Layout/Pages/Home/Home";
import Menu from "../Layout/Pages/Menu/Menu";
import Order from "../Layout/Pages/Order/Order";
import Login from "../Layout/Pages/Login/Login";
import Register from "../Layout/Pages/Register/Register";
import Secret from "../Layout/Pages/Secret/Secret";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import Dashboard from "../Layout/Dashboard";
import Cart from "../Layout/Pages/Dashboard/Cart/Cart";
import AllUsers from "../Layout/Pages/Dashboard/AllUsers/AllUsers";
import AddItems from "../Layout/Pages/Dashboard/AddItems/AddItems";
import AdminRoute from "./AdminRoute";
import ManageItems from "../Layout/Pages/Dashboard/ManageItems/ManageItems";
import UpdateItem from "../Layout/Pages/Dashboard/ManageItems/UpdateItem";
import Payment from "../Layout/Pages/Dashboard/PayMent/Payment";
import PaymentHistory from "../Layout/Pages/Dashboard/PaymentHistory/PaymentHistory";
import UserHome from "../Layout/Pages/Dashboard/UserHome/UserHome";
import AdminHome from "../Layout/Pages/Dashboard/AdminHome/AdminHome";


export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main> ,
      children : [
       {
        path : '/',
        element : <Home></Home>
       } ,
       {
        path : 'menu',
        element : <Menu></Menu>
       },
       {
        path : 'order/:category',
        element : <Order></Order>
       },
       {
        path : 'login',
        element : <Login></Login>
       },
       {
        path : 'register',
        element : <Register></Register>
       },
       {
        path : 'secret',
        element : <PrivateRoute><Secret></Secret></PrivateRoute>
       },
       
      ]
    },
    
    {
      path : 'dashboard',
      element : <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      children : [
        {
          path : 'userHome',
          element : <UserHome></UserHome>
        },
        {
          path : 'cart',
          element : <Cart></Cart>
        },
        {
          path : 'payment',
          element : <Payment></Payment>
        },
        {
          path : 'paymentHistory',
          element : <PaymentHistory></PaymentHistory>
        },
        //admin only routes
        {
          path : 'adminHome',
          element : <AdminRoute><AdminHome></AdminHome></AdminRoute>
        },
        {
          path : 'addItems',
          element : <AdminRoute><AddItems></AddItems></AdminRoute>
        },
        {
          path : 'manageItems',
          element : <AdminRoute> <ManageItems></ManageItems> </AdminRoute>
        },
        {
          path : 'updateItem/:id',
          element : <AdminRoute> <UpdateItem></UpdateItem> </AdminRoute>,
          loader : ({params}) => fetch(`http://localhost:5000/menu/${params.id}`)
        },
        {
          path : 'allUsers',
          element : <AdminRoute><AllUsers></AllUsers></AdminRoute>
        },
      ]
    }
   
  ]);