
import jwtDecode from "jwt-decode";
import { createStore } from "redux";
import AdminUserModel from "../Models/AdminUserModel";
import ClientType from "../Models/ClientType";
import CompanyUserModel from "../Models/CompanyUserModel";
import CustomerUserModel from "../Models/CustomerUserModel";
import UserModel from "../Models/UserModel";

export class AuthState {
    public user: UserModel = null;
    public token: string = null;


    public constructor() {
        this.token = sessionStorage.getItem("token");
        if (this.token) {
            this.user = extractUser(this.token);
        }
    }
}

export enum AuthActionType {
    LOGIN, LOGOUT
}

export interface AuthAction {
    type: AuthActionType;
    payload?: string;

}

export function authReducer(currentState = new AuthState(), action: AuthAction): AuthState {
    const newState = { ...currentState };
    switch (action.type) {
        case AuthActionType.LOGIN:
            newState.token = action.payload;
            newState.user = extractUser(newState.token);
            sessionStorage.setItem("token", newState.token);
            break;
        case AuthActionType.LOGOUT:
            newState.token = null;
            newState.user = null;
            sessionStorage.removeItem("token");
            break;
    }
    return newState
}

function extractUser(token: string): UserModel {
    let user: UserModel;
    const container: any = jwtDecode(token);
    if (container.clientType === ClientType.CUSTOMER) {
        user = new CustomerUserModel(container.clientType, container.id, container.email, container.password, container.firstName, container.lastName);
    } else if (container.clientType === ClientType.COMPANY) {
        user = new CompanyUserModel(container.clientType, container.id, container.email, container.password, container.name);
    } else {
        user = new AdminUserModel(container.clientType, container.id, container.email, container.password);
    }
    return user;
}
export const authStore = createStore(authReducer);