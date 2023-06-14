
import axios from "axios";
import CompanyUserModel from "../Models/CompanyUserModel";
import CustomerUserModel from "../Models/CustomerUserModel";
import { addCompanyAction, addCustomerAction, AdminActionType, adminStore, deleteCompanyAction, deleteCustomerAction, fetchCompanyAction, fetchCustomerAction, updateCompanyAction, updateCustomerAction } from "../Redux/AdminState";
import appConfig from "../Utils/AppConfig";

class AdminService {

  public async addCompany(company: CompanyUserModel): Promise<void> {
    const response = await axios.post<CompanyUserModel>(appConfig.adminUrl + "/add-company", company);
    const addedCompany = response.data;
    adminStore.dispatch(addCompanyAction(addedCompany));
  }

  public async getAllCompanies(): Promise<CompanyUserModel[]> {
    if (adminStore.getState().companies.length === 0) {
      const response = await axios.get<CompanyUserModel[]>(appConfig.adminUrl + "/companies");
      const companies = response.data;
      adminStore.dispatch(fetchCompanyAction(companies));
      return companies;
    }
    return adminStore.getState().companies;
  }

  public async deleteCompany(id: number): Promise<void> {
    await axios.delete(appConfig.adminUrl + "/delete-company/" + id);
    adminStore.dispatch(deleteCompanyAction(id));
  }

  public async getOneCompany(id: number): Promise<CompanyUserModel> {
    const a = adminStore.getState().companies.find((p) => p.id === id);
    return a;
  }

  public async updateCompany(company: CompanyUserModel): Promise<void> {
    const response = await axios.put<CompanyUserModel>(appConfig.adminUrl + "/update-company", company);
    const updatedCompany = response.data;
    adminStore.dispatch(updateCompanyAction(company));
  }

  public async addCustomer(customer: CustomerUserModel): Promise<void> {
    const response = await axios.post<CustomerUserModel>(appConfig.adminUrl + "/add-customer", customer);
    const addedCustomer = response.data;
    adminStore.dispatch(addCustomerAction(addedCustomer));
  }

  public async getAllCustomers(): Promise<CustomerUserModel[]> {
    if (adminStore.getState().customers.length === 0) {
      const response = await axios.get<CustomerUserModel[]>(appConfig.adminUrl + "/customers");
      const customers = response.data;
      adminStore.dispatch(fetchCustomerAction(customers));
      return customers;
    }
    return adminStore.getState().customers;
  }

  public async deleteCustomer(id: number): Promise<void> {
    await axios.delete(appConfig.adminUrl + "/delete-customer/" + id);
    adminStore.dispatch(deleteCustomerAction(id));
  }

  public async getOneCustomer(id: number): Promise<CustomerUserModel> {
    return adminStore.getState().customers.find((p) => p.id === id);
  }

  public async updateCustomer(customer: CustomerUserModel): Promise<void> {
    const response = await axios.put<CustomerUserModel>(appConfig.adminUrl + "/update-customer", customer);
    const updatedCustomer = response.data;
    adminStore.dispatch(updateCustomerAction(customer));
  }
}
const adminService = new AdminService();
export default adminService;