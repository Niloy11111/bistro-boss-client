import { useQuery } from "@tanstack/react-query";
import UseAuth from "../../../../Hooks/UseAuth";
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure";
import { FaDollarSign, FaJediOrder, FaUser } from "react-icons/fa";


const AdminHome = () => {

    const {user} = UseAuth() ;
    const axiosSecure = UseAxiosSecure() ;

    const {data : stats} = useQuery({
        queryKey : ['admin-stats'],
        queryFn : async () => {
            const res = await axiosSecure.get('/admin-stats') ;
            return res.data
     }
    })

    return (
        <div className="text-3xl">
            <h2>Hi , Welcome</h2>
            {
                user?.displayName? user.displayName : 'Back'
            }

<div className="stats shadow">
  
  <div className="stat place-items-center">
    <div className="stat-title">Revenue</div>
    <div className="stat-value">${stats.revenue}</div>
    <FaDollarSign></FaDollarSign>
  </div>
  
  <div className="stat place-items-center">
    <div className="stat-title">Users</div>
    <div className="stat-value text-secondary">{stats.users}</div>
  <FaUser></FaUser>
  </div>
  <div className="stat place-items-center">
    <div className="stat-title">MenuItems</div>
    <div className="stat-value text-secondary">{stats.menuItem}</div>
  <FaUser></FaUser>
  </div>
  
  <div className="stat place-items-center">
    <div className="stat-title">Orders</div>
    <div className="stat-value">{stats.orders}</div>
    <FaJediOrder></FaJediOrder>
  </div>
  
</div>
        </div>
    );
};

export default AdminHome;