import { Visibility, VisibilityOff } from "@mui/icons-material";
import Button from "@mui/material/Button/Button";
import FormControl from "@mui/material/FormControl/FormControl";
import IconButton from "@mui/material/IconButton/IconButton";
import InputAdornment from "@mui/material/InputAdornment/InputAdornment";
import InputLabel from "@mui/material/InputLabel/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput/OutlinedInput";
import TextField from "@mui/material/TextField/TextField";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CustomerUserModel from "../../../Models/CustomerUserModel";
import adminService from "../../../Services/AdminService";
import notificationService from "../../../Services/NotificationService";
import "./AddCustomer.css";

function AddCustomer(): JSX.Element {

  const { register, handleSubmit, formState } = useForm<CustomerUserModel>();
  const navigate = useNavigate();
  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  function isValidateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email)
  }

  function isValidateName(name: string): boolean {
    const nameRegex = /^[a-zA-Z' ']*$/;
    return nameRegex.test(name)
  }

  async function send(customer: CustomerUserModel) {
    try {

      await adminService.addCustomer(customer);
      notificationService.success("customer added")
      navigate("/allCustomers");
    } catch (error: any) {
      console.dir(error);
      notificationService.error(error)
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
    <div className="AddCustomer">
      <form>
        <h2>Add Customer</h2>
        <TextField id="firstName" label="firstName" variant="outlined" required {...register("firstName",
          {
            required: { value: true, message: "Missing first name" },
            minLength: { value: 2, message: "First name too short" },
            validate: (value) => isValidateName(value) || "Name should contains only letters"
          }
        )} />

        <span>{formState?.errors?.firstName?.message}</span>
        <br />
        <br />
        <TextField id="lastName" label="lastName" variant="outlined" required {...register("lastName",
          {
            required: { value: true, message: "Missing last name" },
            minLength: { value: 2, message: "Last name too short" },
            validate: (value) => isValidateName(value) || "Name should contains only letters"
          }
        )} />

        <span>{formState?.errors?.lastName?.message}</span>
        <br />
        <br />
        <TextField id="email" label="email" variant="outlined" required {...register("email",
          {
            required: { value: true, message: "Missing email" },
            validate: (value) => isValidateEmail(value) || "Invalid email address",
            minLength: { value: 2, message: "Email too short" }
          }
        )} />
        <span>{formState?.errors?.email?.message}</span>
        <br />
        <br />
        <FormControl variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password" variant="outlined"     >Password</InputLabel>
          <OutlinedInput
            {...register("password",
              {
                required: { value: true, message: "Missing password" },
                minLength: { value: 6, message: "Password too short" }
              }
            )}
            id="outlined-adornment-password"
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

        <br />
        <br />
        <Button onClick={handleSubmit(send)} variant="outlined" color="primary" >
          Add
        </Button>
      </form>
    </div>
  );
}

export default AddCustomer;
