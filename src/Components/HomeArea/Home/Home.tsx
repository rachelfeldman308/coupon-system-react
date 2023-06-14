
import Button from "@mui/material/Button/Button";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import Category from "../../../Models/Category";
import CouponModel from "../../../Models/CouponModel";
import { customerStore } from "../../../Redux/CustomerState";
import homeService from "../../../Services/HomeService";
import notificationService from "../../../Services/NotificationService";
import CouponCard from "../../CustomerArea/CouponCardPurchase/CouponCardPurchase";
import Loading from "../../ShareArea/Loading/Loading";
import "./Home.css";


function Home(): JSX.Element {
    let couponId:number;
    const [coupons, setCoupons] = useState<CouponModel[]>(customerStore.getState().coupons);
    const [selectPrice,setSelectPrice]=useState<number>(0);
    
  
    useEffect(() => {
            homeService.getAllCoupons().then((res) => {
                setCoupons(res);
            }, (error) => {
                notificationService.error(error);
            });
            // customerStore.subscribe(()=>setCoupons(customerStore.getState().coupon))
    
    }, []);
  
    function handleCategoryChange(e:FormEvent<HTMLButtonElement>) {
        let currentCategory = e.currentTarget.value;
        
         let filteredCoupons = customerStore.getState().coupons;
          if (currentCategory != "ALL") {
              filteredCoupons = filteredCoupons.filter((coupon)=>{
              return coupon.category === currentCategory;
            })
           }
           if (selectPrice != 0) {
              filteredCoupons = filteredCoupons.filter((coupon)=>{
               return coupon.price <= selectPrice;
              })
              }
              
             setCoupons(filteredCoupons);
             filteredCoupons.map((c)=> couponId= c.id);
        
            }
  function handlePriceChange(e: ChangeEvent<HTMLInputElement>) {
      const currentPrice = +e.currentTarget.value;
      setSelectPrice(currentPrice);
      let filterCoupons = customerStore.getState().coupons;
      if (currentPrice !== 0) {
          filterCoupons = filterCoupons.filter((c) => {
              return c.price <= currentPrice;
          })
      }
      setCoupons(filterCoupons);
  }
 
      return (
          <div className="Home">
  
  <Button onClick={handleCategoryChange} className="buttonFood" variant="outlined" color="primary" type="submit" value={Category.FOOD}>FOOD</Button>
  <Button onClick={handleCategoryChange} className="buttonElec" variant="outlined" color="primary" type="submit" value={Category.ELECTRICITY}>ELECTRICITY</Button>
  <Button onClick={handleCategoryChange} className="buttonRest" variant="outlined" color="primary" type="submit" value={Category.RESTAURANT}>RESTAURANT</Button>
  <Button onClick={handleCategoryChange}  className="buttonVac" variant="outlined" color="primary" type="submit" value={Category.VACATION}>VACATION </Button>
  <Button onClick={handleCategoryChange} className="buttonAll" variant="outlined" color="primary" type="submit" value={"ALL"}>All Coupons</Button>
           
                  <br />
                  <br />
                   <label >Filter by price</label>
                   {'  '}
                   <input type="number" value={selectPrice}  onChange={handlePriceChange} min={0} step={0.01}/>
                  <br />
             {coupons.length===0 && <Loading/>}
  
              {coupons.map((p) => (
                  <CouponCard key={p.id} coupon={p} />
                 
              ))}
  
          </div>
      );
  }
  export default Home;