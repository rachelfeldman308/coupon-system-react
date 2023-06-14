import { useForm } from "react-hook-form";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { FormControl, FormLabel, IconButton, InputAdornment, OutlinedInput } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from "react-router-dom";
import ClientType from "../../../Models/ClientType";
import CredentialsModel from "../../../Models/CredentialsModel";
import authService from "../../../Services/AuthService";
import notificationService from "../../../Services/NotificationService";
import "./Login.css";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";


function Login(): JSX.Element {

  function isValidateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email)
  }

  const { register, handleSubmit } = useForm<CredentialsModel>();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  async function send(credentials: CredentialsModel) {
    try {
      await authService.login(credentials);
      notificationService.success("welcome!");
      navigate("/home");
    } catch (err: any) {
      notificationService.error(err);
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
    <div className="Login">

      <form onSubmit={handleSubmit(send)}>
        <TextField id="email" label="email" variant="outlined" required {...register("email",
          {
            required: { value: true, message: "Missing email" },
            validate: (value) => isValidateEmail(value) || "Invalid email address",
            minLength: { value: 2, message: "Email too short" }
          }
        )} />
        <span>Email must include @ and . </span>
        <br />
        <br />
        <FormControl variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password" variant="outlined" >Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            required {...register("password")}
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
        <br />
        <br />
        <FormControl variant="outlined" style={{ 'width': '100%' }} >
          <InputLabel id="demo-simple-select-outlined-label">Client Type:</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            label="Client Type"
            required {...register("clientType")}
          >
            <MenuItem value="">
            </MenuItem>
            <MenuItem value={ClientType.CUSTOMER}>Customer</MenuItem>
            <MenuItem value={ClientType.COMPANY}>Company</MenuItem>
            <MenuItem value={ClientType.ADMIN}>Admin</MenuItem>
          </Select>
        </FormControl>
        <br />
        <br />
        <Button variant="outlined" color="primary" type="submit">
          Login
        </Button>
      </form>
    </div>
  );
}

export default Login;
