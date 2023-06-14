import { AddCircleOutline } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import CompanyUserModel from "../../../Models/CompanyUserModel";
import { adminStore } from "../../../Redux/AdminState";
import adminService from "../../../Services/AdminService";
import notificationService from "../../../Services/NotificationService";
import Loading from "../../ShareArea/Loading/Loading";
import CompanyCard from "../CompanyCard/CompanyCard";
import "./AllCompanies.css";

function AllCompanies(): JSX.Element {
    const [companies, setCompanies] = useState<CompanyUserModel[]>([]);

    useEffect(() => {

        adminService.getAllCompanies().then((res) => {
            setCompanies(res);
        }, (error) => {
            notificationService.error(error);
        });
        // adminStore.subscribe(()=>setCompanies(adminStore.getState().companies))

    }, []);

    return (
        <div className="CompanyList" id="company-list-top">

            <NavLink to="addCompany" title="add company"><AddCircleOutline ></AddCircleOutline></NavLink>

            {companies.length === 0 && <Loading />}

            {companies.map((p) => (
                <CompanyCard key={p.id} company={p} />
            ))}
        </div>
    );
}

export default AllCompanies;
