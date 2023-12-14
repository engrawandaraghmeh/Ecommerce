import CartModel from "../../../DB/model/cart.model.js";
import CouponModel from "../../../DB/model/coupon.model.js";
import ProductModel from "../../../DB/model/product.model.js";

export const CreateOrder=async(req,res,next)=>{
//check Cart
const {CouponName}=req.body;
const Cart=await CartModel.findOne({userId:req.user._id});
if(!Cart){
 return next(new Error("Cart is empty",{cause:400}));
}
req.body.products=Cart.products;

//check Coupon
if(CouponName){
    const Coupon=await CouponModel.findOne({name:CouponName});
    if(!Coupon){
        return next(new Error(`Coupon Not Found`,{cause:404}))

    }
    const currentDate=new Date();
    //return res.json(Coupon.expireDate);//1
    if(Coupon.expireDate<=currentDate){
    return next(new Error("This Coupon has expired",{cause:400}))
 }
 if(Coupon.usedBy.includes(req.user._id)){
    return next(new Error("This Coupon has already used",{cause:409}))

 }
req.body.Coupon=Coupon;
}

for(let product of req.body.products){
  
    const CheckProduct=await ProductModel.findOne({
        _id:product.productId,
        stock:{$gte:product.q}
    })
    if(!CheckProduct){
        return next(new Error("This Quantity not available",{cause:409}))  
    }
   
    product.name=CheckProduct.name;
    
   
 
}
return res.json("OK!") ;
  

}