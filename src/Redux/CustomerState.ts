
import { createStore } from "redux";
import CouponModel from "../Models/CouponModel";


export class CustomerState {
    public coupons: CouponModel[] = [];
    public myCoupons: CouponModel[] = [];

}

export enum CouponActionType {
    FetchCoupons,
    FetchMyCoupons,
    FetchAllCoupons,
    AddCoupon,
    UpdateCoupon,
    Logout
}

export interface CouponAction {
    type: CouponActionType;
    payload?: any;

}

export function addCouponAction(coupon: CouponModel): CouponAction {
    return { type: CouponActionType.AddCoupon, payload: coupon }
}

export function fetchCouponsAction(coupons: CouponModel[]): CouponAction {
    return { type: CouponActionType.FetchCoupons, payload: coupons }
}

export function fetchMyCouponsAction(coupons: CouponModel[]): CouponAction {
    return { type: CouponActionType.FetchMyCoupons, payload: coupons }
}

export function fetchAllCouponsAction(coupons: CouponModel[]): CouponAction {
    return { type: CouponActionType.FetchAllCoupons, payload: coupons }
}

export function updateCouponAction(couponId: number): CouponAction {
    return { type: CouponActionType.UpdateCoupon, payload: couponId }
}

export function logoutCustomerCouponAction(): CouponAction {
    return { type: CouponActionType.Logout, payload: {} };
}
export function couponReducer(currentState: CustomerState = new CustomerState(), action: CouponAction): CustomerState {
    const newState = { ...currentState };
    switch (action.type) {
        case CouponActionType.AddCoupon:
            newState.myCoupons.push(action.payload);
            break;
        case CouponActionType.FetchCoupons:
            newState.coupons = action.payload;
            break;
        case CouponActionType.FetchMyCoupons:
            newState.myCoupons = action.payload
            break;
        case CouponActionType.FetchAllCoupons:
            newState.coupons = action.payload;
            break;
        case CouponActionType.UpdateCoupon:
            const indexToUpdate = newState.coupons.findIndex(p => p.id === action.payload);
            if (indexToUpdate >= 0) {
                newState.coupons[indexToUpdate] = { ...newState.coupons[indexToUpdate], "amount": newState.coupons[indexToUpdate].amount - 1 }
            }
            break;
        case CouponActionType.Logout:
            newState.coupons = [];
            newState.myCoupons = [];
            break;
    }
    return newState
}

export const customerStore = createStore(couponReducer);