import { MenuOpenOutlined } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import CompanyUserModel from "../../../Models/CompanyUserModel";
import "./CompanyCard.css";


interface CompanyCardProps {
    company: CompanyUserModel;
}


function CompanyCard(props: CompanyCardProps): JSX.Element {
    return (
        <div className="CompanyCard Box">
            <div>
                {props.company.name} <br />
                Email: {props.company.email} <br />
                password: {props.company.password} <br />
            </div>
            <div>
                <NavLink to={"/allCompanies/details/" + props.company.id} title="open options">
                    <MenuOpenOutlined></MenuOpenOutlined>
                </NavLink>

            </div>
        </div>
    );
}

export default CompanyCard;
