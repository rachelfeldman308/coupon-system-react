
import { createStore } from "redux";
import CompanyUserModel from "../Models/CompanyUserModel";
import CustomerUserModel from "../Models/CustomerUserModel";


export class AdminState {
    public companies: CompanyUserModel[] = [];
    public customers: CustomerUserModel[] = [];

}

export enum AdminActionType {
    FetchCompanies,
    AddCompanies,
    UpdateCompanies,
    DeleteCompanies,
    FetchCustomers,
    AddCustomers,
    UpdateCustomers,
    DeleteCustomers,
    Logout
}

export interface AdminAction {
    type: AdminActionType;
    payload: any;

}

export function addCompanyAction(company: CompanyUserModel): AdminAction {
    return { type: AdminActionType.AddCompanies, payload: company }
}

export function fetchCompanyAction(companies: CompanyUserModel[]): AdminAction {
    return { type: AdminActionType.FetchCompanies, payload: companies }
}

export function deleteCompanyAction(id: number): AdminAction {
    return { type: AdminActionType.DeleteCompanies, payload: id }
}
export function updateCompanyAction(company: CompanyUserModel): AdminAction {
    return { type: AdminActionType.UpdateCompanies, payload: company }
}

export function addCustomerAction(customer: CustomerUserModel): AdminAction {
    return { type: AdminActionType.AddCustomers, payload: customer }
}

export function fetchCustomerAction(customers: CustomerUserModel[]): AdminAction {
    return { type: AdminActionType.FetchCustomers, payload: customers }
}

export function deleteCustomerAction(id: number): AdminAction {
    return { type: AdminActionType.DeleteCustomers, payload: id }
}

export function updateCustomerAction(customer: CustomerUserModel): AdminAction {
    return { type: AdminActionType.UpdateCustomers, payload: customer }
}

export function logoutAction(): AdminAction {
    return { type: AdminActionType.Logout, payload: {} };
}

export function adminReducer(currentState: AdminState = new AdminState(), action: AdminAction): AdminState {
    const newState = { ...currentState };
    switch (action.type) {
        case AdminActionType.AddCompanies:
            newState.companies.push(action.payload);
            break;
        case AdminActionType.FetchCompanies:
            newState.companies = action.payload;
            break;
        case AdminActionType.UpdateCompanies:
            const indexToUpdate = newState.companies.findIndex(p => p.id === action.payload.id);
            if (indexToUpdate >= 0) newState.companies[indexToUpdate] = action.payload;
            break;
        case AdminActionType.DeleteCompanies:
            const indexToDelete = newState.companies.findIndex(p => p.id === action.payload);
            if (indexToDelete >= 0) newState.companies.splice(indexToDelete, 1);
            break;

        case AdminActionType.AddCustomers:
            newState.customers.push(action.payload);
            break;
        case AdminActionType.FetchCustomers:
            newState.customers = action.payload;
            break;
        case AdminActionType.UpdateCustomers:
            const indexCustomerToUpdate = newState.customers.findIndex(p => p.id === action.payload.id);
            if (indexCustomerToUpdate >= 0) newState.customers[indexCustomerToUpdate] = action.payload;
            break;
        case AdminActionType.DeleteCustomers:
            const indexCustomerToDelete = newState.customers.findIndex(p => p.id === action.payload);
            if (indexCustomerToDelete >= 0) newState.customers.splice(indexCustomerToDelete, 1);
            break;
        case AdminActionType.Logout:
            newState.companies = [];
            newState.customers = [];
            break;
    }
    return newState
}

export const adminStore = createStore(adminReducer);