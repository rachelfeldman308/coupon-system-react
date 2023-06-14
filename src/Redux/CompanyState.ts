import { create } from "domain";
import jwtDecode from "jwt-decode";
import { Interface } from "readline";
import { createStore } from "redux";
import { createBuilderStatusReporter } from "typescript";
import AdminUserModel from "../Models/AdminUserModel";
import ClientType from "../Models/ClientType";
import CompanyUserModel from "../Models/CompanyUserModel";
import CouponModel from "../Models/CouponModel";
import CustomerUserModel from "../Models/CustomerUserModel";
import UserModel from "../Models/UserModel";

export class CompanyState {
    public coupons: CouponModel[] = [];

}

export enum CouponActionType {
    FetchCoupons,
    AddCoupon,
    UpdateCoupon,
    DeleteCoupon,
    Logout,
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

export function deleteCouponAction(id: number): CouponAction {
    return { type: CouponActionType.DeleteCoupon, payload: id }
}

export function updateCouponAction(coupon: CouponModel): CouponAction {
    return { type: CouponActionType.UpdateCoupon, payload: coupon }
}

export function logoutCouponAction(): CouponAction {
    return { type: CouponActionType.Logout, payload: {} }
}

export function couponReducer(currentState: CompanyState = new CompanyState(), action: CouponAction): CompanyState {
    const newState = { ...currentState };
    switch (action.type) {
        case CouponActionType.AddCoupon:
            newState.coupons.push(action.payload);
            break;
        case CouponActionType.FetchCoupons:
            newState.coupons = action.payload;
            break;
        case CouponActionType.UpdateCoupon:
            const indexToUpdate = newState.coupons.findIndex(p => p.id === action.payload.id);
            if (indexToUpdate >= 0) newState.coupons[indexToUpdate] = action.payload;
            break;
        case CouponActionType.DeleteCoupon:
            const indexToDelete = newState.coupons.findIndex(p => p.id === action.payload);
            if (indexToDelete >= 0) newState.coupons.splice(indexToDelete, 1);
            break;
        case CouponActionType.Logout:
            newState.coupons = [];
            break;

    }
    return newState
}

export const companyStore = createStore(couponReducer);