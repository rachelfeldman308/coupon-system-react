
import axios from "axios";
import CouponModel from "../Models/CouponModel";
import CustomerUserModel from "../Models/CustomerUserModel";
import { addCouponAction, customerStore, fetchCouponsAction, fetchMyCouponsAction, updateCouponAction } from "../Redux/CustomerState";
import appConfig from "../Utils/AppConfig";

class CustomerService {

  public async addCoupon(couponId: number): Promise<void> {
    const response = await axios.post<CouponModel>(appConfig.customerUrl + "/add-coupon/" + couponId);
    const addedCoupon = response.data;
    customerStore.dispatch(addCouponAction(addedCoupon));
    customerStore.dispatch(updateCouponAction(couponId));
  }

  public async getAllCoupons(): Promise<CouponModel[]> {
    if (customerStore.getState().coupons.length ===0) {
      const response = await axios.get<CouponModel[]>(appConfig.customerUrl + "/coupons");
      const coupons = response.data;
      customerStore.dispatch(fetchCouponsAction(coupons));
      return coupons;
    }
    return customerStore.getState().coupons;
  }

  public async getCustomerCoupons(): Promise<CouponModel[]> {
    if (customerStore.getState().myCoupons.length <=1) {
      const response = await axios.get<CouponModel[]>(appConfig.customerUrl + "/customer-coupons");
      const coupons = response.data;
      customerStore.dispatch(fetchMyCouponsAction(coupons));
      return coupons;
    }
    return customerStore.getState().myCoupons;
  }


}
const customerService = new CustomerService();
export default customerService;