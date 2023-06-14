import { AddShoppingCartOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import CouponModel from "../../../Models/CouponModel";
import { customerStore } from "../../../Redux/CustomerState";
import customerService from "../../../Services/CustomerService";
import notificationService from "../../../Services/NotificationService";
import "./CouponCardPurchase.css";


interface CouponCardProps {
    coupon: CouponModel;
}
function CouponCardPurchase(props: CouponCardProps): JSX.Element {

    const imageLink = props.coupon.image
    const navigate = useNavigate();
    const index = customerStore.getState().myCoupons.findIndex(p => p.id === props.coupon.id);


    const prodId = +props.coupon.id;


    async function PurchaseCoupon() {

        if (window.confirm("Are you sure you want buy this coupon?")) {
            try {
                await customerService.addCoupon(prodId);
                notificationService.success("Coupon purchase");
                navigate("/CustomerCoupons");
            } catch (error: any) {
                notificationService.error(error);
            }
        }
    }

    return (
        <div className="CouponCard Box">


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
            <br />
            <div>
                {

                    <AddShoppingCartOutlined onClick={PurchaseCoupon}></AddShoppingCartOutlined>

                }

            </div>
        </div>
    );
}

export default CouponCardPurchase;
