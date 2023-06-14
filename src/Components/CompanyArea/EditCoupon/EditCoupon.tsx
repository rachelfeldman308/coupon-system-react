import { Store } from "@mui/icons-material";
import Button from "@mui/material/Button/Button";
import FormControl from "@mui/material/FormControl/FormControl";
import InputLabel from "@mui/material/InputLabel/InputLabel";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import Select from "@mui/material/Select/Select";
import TextField from "@mui/material/TextField/TextField";
import React, { ChangeEvent } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Category from "../../../Models/Category";
import CouponModel from "../../../Models/CouponModel";
import { companyStore } from "../../../Redux/CompanyState";
import companyService from "../../../Services/CompanyService";
import notificationService from "../../../Services/NotificationService";
import "./EditCoupon.css";

function EditCoupon(): JSX.Element {
  function isValidateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email)
  }

  const { register, handleSubmit, formState, setValue, watch } = useForm<CouponModel>();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = React.useState<Date>();

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };


  const params = useParams();
  const id = +params.prodId;

  const couponToFind = companyStore.getState().coupons.find((c) => {
    return c.id === id;
  })
  const [category, setCategory] = React.useState<Category>(couponToFind?.category);

  function handleCategoryChange(e: ChangeEvent<HTMLSelectElement>) {
    setCategory(e.currentTarget.value as Category);
  }


  useEffect(() => {
    companyService.getOneCoupon(id)
      .then((p) => {
        setValue("category", p.category);
        setCategory(p.category)
        setValue("title", p.title);
        setValue("description", p.description);
        setValue("startDate", p.startDate);
        setValue("endDate", p.endDate);
        setValue("amount", p.amount);
        setValue("price", p.price);
        setValue("image", p.image);
      })

      .catch((err) => notificationService.error(err));
  }, []);



  async function send(coupon: CouponModel): Promise<void> {
    coupon.id = id;
    

    try {

      await companyService.updateCoupon(coupon);
      notificationService.success("Coupon has been updated");
      navigate("/allCompanyCoupons");

    } catch (error: any) {
      console.dir(error);
      notificationService.error(error);
    }
  }
  return (
    <div className="EditCoupon">
      <form>
        <h2>Edit Coupon</h2>
        <FormControl variant="outlined" style={{ 'width': '100%' }} >
          <InputLabel id="category">Category: </InputLabel>
          <Select
            labelId="category"
            id="category"
            name="category"
            label="category"
            value={category}
            onChange={handleCategoryChange}
            required {...register("category")}
          >
            <MenuItem value={Category.ELECTRICITY}>Electricity</MenuItem>
            <MenuItem value={Category.FOOD}>Food</MenuItem>
            <MenuItem value={Category.RESTAURANT}>Restaurant</MenuItem>
            <MenuItem value={Category.VACATION}>Vacation</MenuItem>
          </Select>
        </FormControl>

        <span>{formState?.errors?.category?.message}</span>
        <br /> <br />
        <TextField id="title" label="title" variant="outlined" required {...register("title",
          {
            required: { value: true, message: "Missing title" },
            minLength: { value: 3, message: "Name too short" }
          }
        )} />
        <span>{formState?.errors?.title?.message}</span>
        <br /> <br />
      
        <TextField id="description" label="description" variant="outlined" required {...register("description",
          {
            required: { value: true, message: "Missing description" },
            minLength: { value: 5, message: "Description too short" }
          }
        )} />
        <span>{formState?.errors?.description?.message}</span>
        <br /> <br />
       
        <TextField
          id="startDate"
          label="startDate"
          type="date"
          style={{ width: '100%' }}
          value={selectedDate}
          onChange={handleDateChange}
          InputLabelProps={{
            shrink: true,
          }}
          {...register("startDate",)}
        />
        <span>{formState?.errors?.startDate?.message}</span>
        <br /> <br />
        
        <TextField
          id="endDate"
          label="endDate"
          type="date"
          style={{ width: '100%' }}
          value={selectedDate}
          onChange={handleDateChange}
          InputLabelProps={{
            shrink: true,
          }}
          {...register("endDate", {
            validate: (value) =>
              new Date(value) >= new Date(watch("startDate")) ||
              "End date must be after start date",
          })}

        />
        <span>{formState?.errors?.endDate?.message}</span>
        <br /> <br />

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
        <br /> <br />

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
        <br /> <br />
       
        <TextField id="text" label="Image Address" variant="outlined" required {...register("image",)} />
        <br /> <br />
       
        <Button onClick={handleSubmit(send)} variant="outlined" color="primary" >Save</Button>
      </form>
    </div>
  );
}

export default EditCoupon;
