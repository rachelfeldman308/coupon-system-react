
import axios from "axios";
import CouponModel from "../Models/CouponModel";
import { addCompanyAction, addCustomerAction, AdminActionType, adminStore, deleteCompanyAction, deleteCustomerAction, fetchCompanyAction, fetchCustomerAction, updateCompanyAction, updateCustomerAction } from "../Redux/AdminState";
import { addCouponAction, companyStore, deleteCouponAction, fetchCouponsAction, updateCouponAction } from "../Redux/CompanyState";
import appConfig from "../Utils/AppConfig";

class CompanyService {

    public async addCoupon(coupon: CouponModel): Promise<void> {
        const response = await axios.post<CouponModel>(appConfig.companyUrl + "/add-coupon", coupon);
        const addedCoupon = response.data;
        companyStore.dispatch(addCouponAction(addedCoupon));
    }

    public async getCompanyCoupons(): Promise<CouponModel[]> {
        if (companyStore.getState().coupons.length <=1) {
            const response = await axios.get<CouponModel[]>(appConfig.companyUrl + "/company-coupons");
            const coupons = response.data;
            companyStore.dispatch(fetchCouponsAction(coupons));
            return coupons;
        }
        return companyStore.getState().coupons;
    }

    public async deleteCoupon(id: number): Promise<void> {
        await axios.delete(appConfig.companyUrl + "/delete-coupon/" + id);
        companyStore.dispatch(deleteCouponAction(id));
    }

    public async getOneCoupon(id: number): Promise<CouponModel> {
        return companyStore.getState().coupons.find((p) => p.id === id);
    }

    public async updateCoupon(coupon: CouponModel): Promise<void> {
        const response = await axios.put<CouponModel>(appConfig.companyUrl + "/update-coupon", coupon);
        const updatedCoupon = response.data;
        companyStore.dispatch(updateCouponAction(coupon));
    }


}
const companyService = new CompanyService();
export default companyService;