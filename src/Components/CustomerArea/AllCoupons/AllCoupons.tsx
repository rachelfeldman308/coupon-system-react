import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useState, useEffect, ChangeEvent } from "react";
import { NavLink } from "react-router-dom";
import ClientType from "../../../Models/ClientType";
import CouponModel from "../../../Models/CouponModel";
import { customerStore } from "../../../Redux/CustomerState";
import customerService from "../../../Services/CustomerService";
import notificationService from "../../../Services/NotificationService";
import Loading from "../../ShareArea/Loading/Loading";
import CouponCard from "../CouponCardPurchase/CouponCardPurchase";
import "./AllCoupons.css";

// function AllCoupons(): JSX.Element {
//     const [coupons, setCoupons] = useState<CouponModel[]>([]);
//     const [selectCategory,setSelectCategory]=useState<string>("ALL");
//     const [selectPrice,setSelectPrice]=useState<number>(0);

//     useEffect(() => {
//             customerService.getCustomerCoupons();
//             customerService.getAllCoupons().then((res) => {
//                 setCoupons(res);
//             }, (error) => {
//                 notificationService.error(error);
//             });
//             // customerStore.subscribe(()=>setCoupons(customerStore.getState().coupon))
    
//     }, []);

//     function handleCategoryChange(e:ChangeEvent<HTMLSelectElement>) {
//         const currentCategory=e.currentTarget.value;
//         setSelectCategory(currentCategory) ;
//         let filterCoupons=customerStore.getState().coupons;
//         if(currentCategory!=="ALL"){
//          filterCoupons=filterCoupons.filter((c)=>{
//              return c.category.toString()===currentCategory;
//          })
//         }
//         if(selectPrice!==0){
//          filterCoupons=filterCoupons.filter((c)=>{
//              return c.price<=selectPrice;
//          })
//         }
//         setCoupons(filterCoupons);
//      }
 
//      function handlePriceChange(e:ChangeEvent<HTMLInputElement>) {
//          const currentPrice=+e.currentTarget.value;
//          setSelectPrice(currentPrice) ;
//          let filterCoupons=customerStore.getState().coupons;
//          if(currentPrice!==0){
//           filterCoupons=filterCoupons.filter((c)=>{
//               return c.price<=currentPrice;
//           })
//          }
//          if(selectCategory!=="ALL"){
//              filterCoupons=filterCoupons.filter((c)=>{
//                  return c.category.toString()===selectCategory;
//              })
//             }
//          setCoupons(filterCoupons);
//       }
//     return (
//         <div className="AllCoupons">
           
//            <select  value={selectCategory} onChange={handleCategoryChange} >
//                     <option value="ALL">Select Category</option>
//                     <option value="ELECTRICITY">Electricity</option>
//                     <option value="FOOD">Food</option>
//                     <option value="RESTAURANT">Restaurant</option>
//                     <option value="VACATION">Vacation</option>
//                 </select>
//                 <br />
//                 {/* <FormControl variant="outlined" style={{'width': '100%'}} >
//         <InputLabel id="demo-simple-select-outlined-label" >Select Category:</InputLabel>
//         <Select
        
//           labelId="demo-simple-select-outlined-label"
//           id="demo-simple-select-outlined"
//           label="Client Type"
          
//         >
//           <MenuItem value={selectCategory} >
//           </MenuItem >
//           <MenuItem value="ALL"><option value="ALL">Select Category</option></MenuItem>
//           <MenuItem value="ELECTRICITY"><option value="ELECTRICITY">Electricity</option></MenuItem>
//           <MenuItem value="FOOD"><option value="FOOD">Food</option></MenuItem>
//           <MenuItem value="RESTAURANT"><option value="RESTAURANT">Restaurant</option></MenuItem>
//           <MenuItem value="VACATION"><option value="VACATION">Vacation</option></MenuItem>
//         </Select>
//       </FormControl> */}
//                 <br />

//                 <input type="number" value={selectPrice}  onChange={handlePriceChange} min={0} step={0.01}/>
//            {coupons.length===0 && <Loading/>}

//             {coupons.map((p) => (
//                 <CouponCard key={p.id} coupon={p} />
               
//             ))}
//         </div>
//     );
// }

// export default AllCoupons;
