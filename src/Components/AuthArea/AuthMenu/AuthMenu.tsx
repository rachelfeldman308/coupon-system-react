
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import { adminStore, logoutAction } from "../../../Redux/AdminState";
import { AuthState, authStore } from "../../../Redux/AuthState";
import { companyStore, logoutCouponAction } from "../../../Redux/CompanyState";
import { customerStore, logoutCustomerCouponAction } from "../../../Redux/CustomerState";
import authService from "../../../Services/AuthService";
import "./AuthMenu.css";

function AuthMenu(): JSX.Element {

    const [user, setUser] = useState<UserModel>();

    useEffect(() => {

        setUser(authStore.getState().user);
        const unsubscribe = authStore.subscribe(() => {
            setUser(authStore.getState().user);
        });
        return unsubscribe;
    }, [])

    function logout(): void {
        authService.logout();
        adminStore.dispatch(logoutAction());
        companyStore.dispatch(logoutCouponAction());
        customerStore.dispatch(logoutCustomerCouponAction());
        alert("bay bay......");
    }

    return (

        <div className="AuthMenu">

            {!user &&
                <>
                    <span>Hello Guest |</span>
                    <NavLink to="/login" className="login"> Login</NavLink>
                </>
            }

            {user &&
                <>
                    <span>Hello {user.email} | </span>
                    <NavLink to="/home" onClick={logout} className="logout"> Logout</NavLink>
                </>
            }

        </div>
    );
}

export default AuthMenu;
