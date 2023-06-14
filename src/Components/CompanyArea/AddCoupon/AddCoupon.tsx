import Button from "@mui/material/Button/Button";
import TextField from "@mui/material/TextField/TextField";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Category from "../../../Models/Category";
import CouponModel from "../../../Models/CouponModel";
import companyService from "../../../Services/CompanyService";
import notificationService from "../../../Services/NotificationService";
import "./AddCoupon.css";
import React from "react";
import FormControl from "@mui/material/FormControl/FormControl";
import InputLabel from "@mui/material/InputLabel/InputLabel";
import Select from "@mui/material/Select/Select";
import MenuItem from "@mui/material/MenuItem/MenuItem";

function AddCoupon(): JSX.Element {
  const { register, handleSubmit, formState, watch } = useForm<CouponModel>();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = React.useState<Date>();

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  async function send(coupon: CouponModel) {
    try {
      coupon.image = (coupon.image);
      await companyService.addCoupon(coupon);
      notificationService.success("coupon added")
      navigate("/AllCompanyCoupons");
    } catch (error: any) {
      console.dir(error);
      notificationService.error(error)
    }
  }
  return (
    <div className="AddCoupon">
      <form>
        <h2>Add Coupon</h2>

        <FormControl variant="outlined" style={{ 'width': '100%' }} >
          <InputLabel id="demo-simple-select-outlined-label">Category: </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            label="category"
            required {...register("category")}
          >
            <MenuItem value="">
            </MenuItem>
            <MenuItem value={Category.ELECTRICITY}>Electricity</MenuItem>
            <MenuItem value={Category.FOOD}>Food</MenuItem>
            <MenuItem value={Category.RESTAURANT}>Restaurant</MenuItem>
            <MenuItem value={Category.VACATION}>Vacation</MenuItem>
          </Select>
        </FormControl>

        <span>{formState?.errors?.category?.message}</span>
        <br />
        <br />
     
        <TextField id="title" label="Title:" variant="outlined" required {...register("title",
          {
            required: { value: true, message: "Missing title" },
            minLength: { value: 3, message: "Name too short" }
          }
        )} />
        <span>{formState?.errors?.title?.message}</span>
        <br />
        <br />
      
        <TextField id="description" label="Description:" variant="outlined" required {...register("description",
          {
            required: { value: true, message: "Missing description" },
            minLength: { value: 5, message: "Description too short" }
          }
        )} />
        <span>{formState?.errors?.description?.message}</span>
        <br />
        <br />
       
        <TextField

          id="date"
          label="Start Date:"
          type="date"
          style={{ width: '100%' }}
          value={selectedDate}
          onChange={handleDateChange}
          InputLabelProps={{
            shrink: true,

          }}
          {...register("startDate",
          )}
        />
        <span>{formState?.errors?.startDate?.message}</span>
        <br />
        <br />

        <TextField
          id="date"
          label="End Date"
          type="date"
          style={{ width: '100%' }}
          value={selectedDate}
          onChange={handleDateChange}
          InputLabelProps={{
            shrink: true,
          }}
          {...register("endDate",
            {
              validate: (value) =>
                new Date(value) >= new Date(watch("startDate")) ||
                "End date must be after start date",
            })}
        />

        <span>{formState?.errors?.endDate?.message}</span>
        <br />
        <br />
       
        <TextField
          required {...register("amount",
            {
              required: { value: true, message: "Missing amount" },
              min: { value: 0, message: "Amount cannot be negative" },
              max: { value: 1000, message: "Amount cannot exeed 1000" }
            }
          )}
          id="outlined-number"
          label="Amount"
          type="number"
          InputLabelProps={{
            shrink: true,

          }}
          variant="outlined"

        />
        <span>{formState.errors?.amount?.message}</span>
        <br />
        <br />
       
        <TextField
          required {...register("price",
            {
              required: { value: true, message: "Missing price" },
              min: { value: 0, message: "Price cannot be negative" },
              max: { value: 1000, message: "Price cannot exeed 1000" }
            }
          )}
          id="outlined-number"
          label="Price"
          type="number"
          InputLabelProps={{
            shrink: true,

          }}
          variant="outlined"

        />
        <span>{formState.errors?.price?.message}</span>

        <br />
        <br />
      
        <TextField id="text" label="Image Address:" variant="outlined" required {...register("image",)} />
        <br />
        <br />

      
        <Button onClick={handleSubmit(send)} variant="outlined" color="primary" >
          Add
        </Button>
      </form>
    </div>
  );
}


export default AddCoupon;
