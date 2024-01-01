import { NavLink, Outlet } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaAd, FaBook, FaCalendar, FaExchangeAlt, FaHome, FaLeaf, FaList } from 'react-icons/fa';
import UseCart from "../Hooks/UseCart";
import UseAdmin from "../Hooks/UseAdmin";
const Dashboard = () => {
    const [cart] = UseCart() ;
    //TODO : get isAdmin value from the database 
    const [isAdmin] = UseAdmin() ;
    console.log('dashboard',isAdmin)
  

    return (
        <div className="flex">
            <div className="w-64 min-h-screen bg-orange-400"> 
                <ul className="menu space-y-2">
                    {
                        isAdmin ? 
                        <>
                         <li> 
                        <NavLink to='/dashboard/adminHome'> 
                       <FaHome></FaHome>
                     Admin Home</NavLink> </li>
                              
                    <li> 
                        <NavLink to='/dashboard/addItems'> 
                       <FaCalendar></FaCalendar>
                        Add Items</NavLink> </li>
              
                    <li> 
                        <NavLink to='/dashboard/manageItems'> 
                       <FaCalendar></FaCalendar>
                        Manage Items</NavLink> </li>
                  
                    <li> 
                        <NavLink to='/dashboard/manageBookings'> 
                       <FaBook></FaBook>
                        Manage Booking</NavLink> </li>
                   
                    <li> 
                        <NavLink to='/dashboard/allUsers'> 
                       <FaCalendar></FaCalendar>
                        All Users</NavLink> </li>
                 
                        </> 
                        :
                        <>
                         <li> 
                        <NavLink to='/dashboard/userHome'> 
                       <FaHome></FaHome>
                      Home</NavLink> </li>
                              
                    <li> 
                        <NavLink to='/dashboard/history'> 
                       <FaCalendar></FaCalendar>
                        Payment History</NavLink> </li>
                    <li> 

                    <li> 
                        <NavLink to='/dashboard/cart'> 
                        <AiOutlineShoppingCart></AiOutlineShoppingCart>
                        My Cart ({cart?.length})</NavLink> </li>

                        <NavLink to='/dashboard/review'> 
                       <FaAd></FaAd>
                        Add a Review</NavLink> </li>
                    <li> 
                        <NavLink to='/dashboard/paymentHistory'> 
                       <FaList></FaList>
                        True PayHistory </NavLink> </li>

                        </>
                    }

               
                        {/* shared navLinks */}
                        <div className="divider"></div>
                        <li> 
                        <NavLink to='/'> 
                       <FaHome></FaHome>
                        User Home</NavLink> </li>
                        <li> 
                        <NavLink to='/order/salad'> 
                       <FaExchangeAlt></FaExchangeAlt>
                        Menu</NavLink> </li>
                        <li> 
                        <NavLink to='/order/contact'> 
                       <FaLeaf></FaLeaf>
                        Contact</NavLink> </li>

                </ul>

            </div>

            <div className="flex-1 p-12">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;