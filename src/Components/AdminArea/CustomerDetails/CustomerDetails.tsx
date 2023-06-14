import { CreateOutlined, DeleteOutline, EditOutlined, KeyboardBackspace } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import CustomerUserModel from "../../../Models/CustomerUserModel";
import adminService from "../../../Services/AdminService";
import notificationService from "../../../Services/NotificationService";
import "./CustomerDetails.css";

function CustomerDetails(): JSX.Element {

    const params = useParams();
    const prodId = +params.prodId;

    const [customer, setCustomer] = useState<CustomerUserModel>();
    const navigate = useNavigate();

    async function deleteCustomer() {
        if (window.confirm("Are you sure?")) {
            try {
                await adminService.deleteCustomer(prodId);
                notificationService.success("Customer deleted");
                navigate("/allCustomers");
            } catch (error: any) {
                notificationService.error(error);
            }
        }
    }

    useEffect(() => {
        adminService
            .getOneCustomer(prodId)
            .then((p) => setCustomer(p))
            .catch((e) => notificationService.error(e));
    }, []);


    return (
        <div className="CustomerDetails Box">
            {customer && (
                <>
                    <h3>First name: {customer.firstName}</h3>
                    <h3>Last name: {customer.lastName}</h3>
                    <h3>Email: {customer.email}</h3>
                    <h3>Password: {customer.password}</h3>


                    <br /><br />
                    <NavLink to="/allCustomers" title="go back to all customers"><KeyboardBackspace></KeyboardBackspace></NavLink>
                    <span> | </span>
                    <NavLink to="" onClick={deleteCustomer} title="delete"><DeleteOutline></DeleteOutline></NavLink>
                    <span> | </span>
                    <NavLink to={"/allCustomers/edit/" + prodId} title="edit" ><EditOutlined></EditOutlined></NavLink>
                </>
            )}
        </div>
    );
}

export default CustomerDetails;
