import { useState, useEffect } from "react";
import CouponModel from "../../../Models/CouponModel";
import { customerStore } from "../../../Redux/CustomerState";
import customerService from "../../../Services/CustomerService";
import notificationService from "../../../Services/NotificationService";
import Loading from "../../ShareArea/Loading/Loading";
import MyCouponCard from "../MyCouponCard/MyCouponCard";
import "./CustomerCoupons.css";

function CustomerCoupons(): JSX.Element {
    const [coupons, setCoupons] = useState<CouponModel[]>([]);

    useEffect(() => {


        customerService.getCustomerCoupons().then((res) => {
            setCoupons(res);
        }, (error) => {
            notificationService.error(error);
        });
        customerStore.subscribe(() => setCoupons(customerStore.getState().coupons))

    }, []);
    return (
        <div className="CustomerCoupons">


            {coupons.length === 0 && <Loading />}

            {coupons.map((p) => (
                <MyCouponCard key={p.id} coupon={p} />

            ))}
        </div>
    );
}

export default CustomerCoupons;
