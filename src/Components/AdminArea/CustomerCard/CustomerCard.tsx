import { MenuOpenOutlined } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import CustomerUserModel from "../../../Models/CustomerUserModel";
import "./CustomerCard.css";

interface CustomerCardProps {
    customer: CustomerUserModel;
}

function CustomerCard(props: CustomerCardProps): JSX.Element {
    return (
        <div className="CustomerCard Box">
            <div>
                First Name: {props.customer.firstName} <br />
                Last Name: {props.customer.lastName} <br />
                Email: {props.customer.email} <br />
                Password: {props.customer.password} <br />
            </div>
            <div>
                <NavLink to={"/allCustomers/details/" + props.customer.id} title="open options">
                    <MenuOpenOutlined></MenuOpenOutlined>
                </NavLink>

            </div>
        </div>
    );
}

export default CustomerCard;
