import axios from "axios";
import CouponModel from "../Models/CouponModel";
import { customerStore, fetchAllCouponsAction } from "../Redux/CustomerState";
import appConfig from "../Utils/AppConfig";

class HomeService {

  public async getAllCoupons(): Promise<CouponModel[]> {
    if (customerStore.getState().coupons.length <=1) {
      const response = await axios.get<CouponModel[]>(appConfig.homerUrl);
      const coupons = response.data;
      customerStore.dispatch(fetchAllCouponsAction(coupons));
      return coupons;
    }
    return customerStore.getState().coupons;
  }
}

const homeService = new HomeService();
export default homeService;