import Category from "./Category";
import CompanyUserModel from "./CompanyUserModel";

class CouponModel {
   public id: number;
   public company: CompanyUserModel;
   public category: Category;
   public title: string;
   public description: string;
   public startDate: Date;
   public endDate: Date;
   public amount: number
   public price: number;
   public imageName: string;
   public image: string;


}

export default CouponModel;