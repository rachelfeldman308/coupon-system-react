import { NavLink } from "react-router-dom";
import "./CompanyArea.css";

function CompanyArea(): JSX.Element {
    return (
        <div className="CompanyArea">
            <NavLink to={"allCompanyCoupons/addCoupon"}>addCoupon</NavLink>
        </div>
    );
}

export default CompanyArea;
