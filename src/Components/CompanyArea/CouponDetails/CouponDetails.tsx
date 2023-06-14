import { CreateOutlined, DeleteOutline, EditOutlined, KeyboardBackspace } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import CouponModel from "../../../Models/CouponModel";
import companyService from "../../../Services/CompanyService";
import notificationService from "../../../Services/NotificationService";
import "./CouponDetails.css";

function CouponDetails(): JSX.Element {
    const params = useParams();
    const prodId = +params.prodId;

    function formatDate(date: Date) {
        let dateFront = new Date(date),
            month = '' + (dateFront.getMonth() + 1),
            day = '' + dateFront.getDate(),
            year = dateFront.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }

    const [coupon, setCoupon] = useState<CouponModel>();
    const navigate = useNavigate();

    async function deleteCoupon() {
        if (window.confirm("Are you sure?")) {
            try {
                await companyService.deleteCoupon(prodId);
                notificationService.success("Coupon deleted");
                navigate("/allCompanyCoupons");
            } catch (error: any) {
                notificationService.error(error);
            }
        }
    }

    useEffect(() => {
        companyService
            .getOneCoupon(prodId)
            .then((p) => setCoupon(p))
            .catch((e) => notificationService.error(e));
    }, []);


    return (
        <div className="CouponDetails Box">
            {coupon && (
                <>
                    <img src={coupon.image} alt="" />
                    <h3>Category: {coupon.category}</h3>
                    <h3>Title: {coupon.title}</h3>
                    <h3>Description: {coupon.description}</h3>
                    <h3> Start Date: {formatDate(coupon.startDate)}</h3>
                    <h3>End Date: {formatDate(coupon.endDate)}</h3>
                    <h3>Amount: {coupon.amount}</h3>
                    <h3>Price: {coupon.price}</h3>
                    <br /><br />
                    <NavLink to="/allCompanyCoupons" title="back to all coupons"><KeyboardBackspace></KeyboardBackspace></NavLink>

                    <NavLink to="" onClick={deleteCoupon} title="delete"><DeleteOutline></DeleteOutline></NavLink>

                    <NavLink to={"/allCompanyCoupons/edit/" + prodId} title="edit"><EditOutlined></EditOutlined></NavLink>
                </>
            )}
        </div>
    );
}

export default CouponDetails;
