import { Route, Routes } from "react-router-dom";
import About from "../../AboutArea/About/About";
import AddCompany from "../../AdminArea/AddCompany/AddCompany";
import AddCustomer from "../../AdminArea/AddCustomer/AddCustomer";
import AdminArea from "../../AdminArea/AdminArea/AdminArea";
import AllCompanies from "../../AdminArea/AllCompanies/AllCompanies";
import AllCustomers from "../../AdminArea/AllCustomers/AllCustomers";
import CompanyDetails from "../../AdminArea/CompanyDetails/CompanyDetails";
import CustomerDetails from "../../AdminArea/CustomerDetails/CustomerDetails";
import EditCompany from "../../AdminArea/EditCompany/EditCompany";
import EditCustomer from "../../AdminArea/EditCustomer/EditCustomer";
import Login from "../../AuthArea/Login/Login";
import AddCoupon from "../../CompanyArea/AddCoupon/AddCoupon";
import CompanyArea from "../../CompanyArea/CompanyArea/CompanyArea";
import CompanyCoupons from "../../CompanyArea/CompanyCoupons/CompanyCoupons";
import CouponDetails from "../../CompanyArea/CouponDetails/CouponDetails";
import Home from "../../HomeArea/Home/Home";
import PageNotFound from "../PageNotFound/PageNotFound";
import EditCoupon from "../../CompanyArea/EditCoupon/EditCoupon";
import CustomerCoupons from "../../CustomerArea/CustomerCoupons/CustomerCoupons";



function Routing(): JSX.Element {
    return (
     <Routes>  
        <Route path="/" element={<Home/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/adminArea" element={<AdminArea/>}/>
        <Route path="/allCompanies" element={<AllCompanies/>}/>
        <Route path="/allCompanies/addCompany" element={<AddCompany/>}/>
        <Route path="/allCompanies/details/:prodId" element={<CompanyDetails/>} />
        <Route path="/allCompanies/edit/:prodId" element={<EditCompany/>} />
        <Route path="/allCustomers" element={<AllCustomers/>}/>
        <Route path="/allCustomers/addCustomer" element={<AddCustomer/>}/>
        <Route path="/allCustomers/details/:prodId" element={<CustomerDetails/>} />
        <Route path="/allCustomers/edit/:prodId" element={<EditCustomer/>} />
        <Route path="/companyArea" element={<CompanyArea/>}/>
        <Route path="/allCompanyCoupons/addCoupon" element={<AddCoupon/>}/>
        <Route path="/allCompanyCoupons" element={<CompanyCoupons/>}/>
        <Route path="/allCompanyCoupons/details/:prodId" element={<CouponDetails/>}/>
        <Route path="/allCompanyCoupons/edit/:prodId" element={<EditCoupon/>}/> 
        <Route path="/customerCoupons" element={<CustomerCoupons/>}/>
        <Route path="*" element={<PageNotFound/>} />
     </Routes>
      
      
    );
}

export default Routing;
