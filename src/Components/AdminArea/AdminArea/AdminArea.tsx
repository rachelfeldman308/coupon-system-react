import { NavLink } from "react-router-dom";
import "./AdminArea.css";

function AdminArea(): JSX.Element {
    return (
        <div className="AdminArea">
            <NavLink to={"allCompanies"}>AllCompanies</NavLink>
            <br />
            <NavLink to={"allCustomers"}>AllCustomers</NavLink>
        </div>
    );
}

export default AdminArea;
