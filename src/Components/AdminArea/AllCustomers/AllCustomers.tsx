import { AddCircleOutline } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import CustomerUserModel from "../../../Models/CustomerUserModel";
import { adminStore } from "../../../Redux/AdminState";
import adminService from "../../../Services/AdminService";
import notificationService from "../../../Services/NotificationService";
import Loading from "../../ShareArea/Loading/Loading";
import CustomerCard from "../CustomerCard/CustomerCard";
import "./AllCustomers.css";

function AllCustomers(): JSX.Element {
    const [customers, setCustomers] = useState<CustomerUserModel[]>(adminStore.getState().customers);

    useEffect(() => {

        adminService.getAllCustomers().then((res) => {
            setCustomers(res);
        }, (error) => {
            notificationService.error(error);
        });
        //  adminStore.subscribe(()=>setCustomers(adminStore.getState().customers))

    }, []);
    return (
        <div className="AllCustomers">
            <NavLink to="addCustomer" title="add customer"><AddCircleOutline></AddCircleOutline></NavLink>

            {customers.length === 0 && <Loading />}

            {customers.map((p) => (
                <CustomerCard key={p.id} customer={p} />
            ))}
        </div>
    );
}

export default AllCustomers;
