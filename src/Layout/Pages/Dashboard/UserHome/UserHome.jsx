
import UseAuth from '../../../../Hooks/UseAuth';

const UserHome = () => {
    const {user} = UseAuth() ;
    return (
        <div className="text-3xl">

            <h2> Hi, Welcome</h2>
            {
                user?.displayName? user.displayName : 'Back'
            }
        </div>
    );
};

export default UserHome;