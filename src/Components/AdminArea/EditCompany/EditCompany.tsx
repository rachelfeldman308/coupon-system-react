import { Visibility, VisibilityOff } from "@mui/icons-material";
import Button from "@mui/material/Button/Button";
import FormControl from "@mui/material/FormControl/FormControl";
import IconButton from "@mui/material/IconButton/IconButton";
import InputAdornment from "@mui/material/InputAdornment/InputAdornment";
import InputLabel from "@mui/material/InputLabel/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput/OutlinedInput";
import TextField from "@mui/material/TextField/TextField";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import CompanyUserModel from "../../../Models/CompanyUserModel";
import adminService from "../../../Services/AdminService";
import notificationService from "../../../Services/NotificationService";
import "./EditCompany.css";

function EditCompany(): JSX.Element {

  function isValidateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email)
  }

  const { register, handleSubmit, formState, setValue } = useForm<CompanyUserModel>();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  const params = useParams();
  const id = +params.prodId;

  useEffect(() => {
    adminService.getOneCompany(id)

      .then((p) => {
        setValue("name", p.name);
        setValue("email", p.email);
        setValue("password", p.password);
      })

      .catch((err) => notificationService.error(err));
  }, []);



  async function send(company: CompanyUserModel) {
    company.id = id;
    console.log(company);

    try {

      await adminService.updateCompany(company);
      notificationService.success("Company has been updated");
      navigate("/allCompanies");

    } catch (error: any) {
      console.dir(error);
      notificationService.error(error);
    }
  }

  const handleChange = (prop: any) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  return (
    <div className="EditCompany">
      <form>
        <h2>Edit Company</h2>

        <TextField disabled={true} id="name" label="name" variant="outlined" required {...register("name",
          {
            required: { value: true, message: "Missing name" }
          }
        )} />
        <span>{formState.errors?.name?.message}</span>
        <br /> <br />

        <TextField id="email" label="email" variant="outlined" required {...register("email",
          {
            required: { value: true, message: "Missing email" },
            validate: (value) => isValidateEmail(value) || "Invalid email address",
            minLength: { value: 2, message: "Email too short" }
          }
        )} />
        <span>{formState?.errors?.email?.message}</span>
        <br /> <br />

        <FormControl variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password" variant="outlined" >Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            required {...register("password",
              {
                required: { value: true, message: "Missing password" },
                minLength: { value: 6, message: "Password too short" }

              }
            )}
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end" >
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <span>{formState?.errors?.password?.message}</span>
        <br /> <br />

        <Button onClick={handleSubmit(send)} variant="outlined" color="primary" >Save</Button>
      </form>
    </div>
  );
}

export default EditCompany;
