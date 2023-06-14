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
import CustomerUserModel from "../../../Models/CustomerUserModel";
import adminService from "../../../Services/AdminService";
import notificationService from "../../../Services/NotificationService";
import "./EditCustomer.css";

function EditCustomer(): JSX.Element {

  function isValidateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email)
  }

  const { register, handleSubmit, formState, setValue } = useForm<CustomerUserModel>();
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
    adminService.getOneCustomer(id)

      .then((p) => {
        setValue("firstName", p.firstName);
        setValue("lastName", p.lastName);
        setValue("email", p.email);
        setValue("password", p.password);
      })

      .catch((err) => notificationService.error(err));
  }, []);



  async function send(customer: CustomerUserModel) {
    customer.id = id;
    console.log(customer);

    try {

      await adminService.updateCustomer(customer);
      notificationService.success("Customer has been updated");
      navigate("/allCustomers");

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
    <div className="EditCustomer">
      <form>
        <h2>Edit Customer</h2>

        <TextField id="firstName" label="firstName" variant="outlined" required {...register("firstName",
          {
            required: { value: true, message: "Missing first name" },
            minLength: { value: 2, message: "First name too short" }
          }
        )} />
        <span>{formState?.errors?.firstName?.message}</span>
        <br /> <br />
        <TextField id="lastName" label="lastName" variant="outlined" required {...register("lastName",
          {
            required: { value: true, message: "Missing last name" },
            minLength: { value: 2, message: "Last name too short" }
          }
        )} />
        <span>{formState?.errors?.lastName?.message}</span>
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

export default EditCustomer;
