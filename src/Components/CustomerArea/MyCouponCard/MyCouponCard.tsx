import { AddShoppingCartOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import CouponModel from "../../../Models/CouponModel";
import { customerStore } from "../../../Redux/CustomerState";
import customerService from "../../../Services/CustomerService";
import notificationService from "../../../Services/NotificationService";
import "./MyCouponCard.css";

interface CouponCardProps {
    coupon: CouponModel;
}

function MyCouponCard(props: CouponCardProps): JSX.Element {
    const imageLink = props.coupon.image

    return (
        <div className="MyCouponCard Box">
            <>
                <img src={props.coupon.image} alt="" /><br />
                Category: {props.coupon.category} <br />
                Title: {props.coupon.title} <br />
                Description: {props.coupon.description} <br />
                StartDate: {props.coupon.startDate} <br />
                EndDate: {props.coupon.endDate} <br />
                Amount: {props.coupon.amount} <br />
                Price: {props.coupon.price} <br />
            </>
        </div>
    );
}

export default MyCouponCard;
