import { CreateOutlined, DeleteOutline, EditOutlined, KeyboardBackspace } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import CompanyUserModel from "../../../Models/CompanyUserModel";
import adminService from "../../../Services/AdminService";
import notificationService from "../../../Services/NotificationService";
import "./CompanyDetails.css";

function CompanyDetails(): JSX.Element {
    const params = useParams();
    const prodId = +params.prodId;

    const [company, setCompany] = useState<CompanyUserModel>();
    const navigate = useNavigate();

    async function deleteCompany() {
        if (window.confirm("Are you sure?")) {
            try {
                await adminService.deleteCompany(prodId);
                notificationService.success("Company deleted");
                navigate("/allCompanies");
            } catch (error: any) {
                notificationService.error(error);
            }
        }
    }

    useEffect(() => {
        adminService
            .getOneCompany(prodId)
            .then((p) => setCompany(p))
            .catch((e) => notificationService.error(e));
    }, []);



    return (
        <div className="CompanyDetails Box">
            {company && (
                <>
                    <h3>Name: {company.name}</h3>
                    <h3>Email: {company.email}</h3>
                    <h3>Password: {company.password}</h3>


                    <br /><br />
                    <NavLink to="/allCompanies" title="go back to all companies"><KeyboardBackspace></KeyboardBackspace></NavLink>
                    <span>              </span>
                    <NavLink to="" onClick={deleteCompany} title="delete"><DeleteOutline></DeleteOutline></NavLink>
                    {'        '}
                    <NavLink to={"/allCompanies/edit/" + prodId} title="edit"><EditOutlined></EditOutlined></NavLink>

                </>
            )}
        </div>
    );
}

export default CompanyDetails;
