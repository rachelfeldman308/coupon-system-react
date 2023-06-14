import { MenuOpenOutlined } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import CouponModel from "../../../Models/CouponModel";
import "./CouponCard.css";

interface CouponCardProps {
    coupon: CouponModel;
}

function CouponCard(props: CouponCardProps): JSX.Element {
    const imageLink = props.coupon.image

    return (
        <div className="CustomerCard Box">
            <>
                <img src={props.coupon.image} alt="" /><br />
                Category: {props.coupon.category} <br />
                Title: {props.coupon.title} <br />
                Description: {props.coupon.description} <br />
                Start Date: {props.coupon.startDate} <br />
                End Date: {props.coupon.endDate} <br />
                Amount: {props.coupon.amount} <br />
                Price: {props.coupon.price} <br />

            </>
            <div>
                <NavLink to={"/allCompanyCoupons/details/" + props.coupon.id} title="open options">
                    <MenuOpenOutlined ></MenuOpenOutlined>
                </NavLink>

            </div>
        </div>

    );
}

export default CouponCard;
