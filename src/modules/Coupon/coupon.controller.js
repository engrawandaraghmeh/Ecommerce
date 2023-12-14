import CouponModel from "../../../DB/model/coupon.model.js";

export const CreateCoupon=async(req,res)=>{

const {name}=req.body;
req.body.expireDate=new Date(req.body.expireDate)
if(await CouponModel.findOne({name})){
    return res.json({message:"Coupon already exist"})
}
const coupon=await CouponModel.create(req.body);
return res.json({message:"Success",coupon});


}

export const GetCoupon=async(req,res)=>{
   const coupons=await CouponModel.find({});
   return res.status(201).json({message:"Success",coupons});
}

export const UpdateCoupon=async(req,res)=>{
    const coupon=await CouponModel.findById(req.params.id);
    if(!coupon){
        return res.status(404).json({message:"Coupon not exist"});
    }
    if(req.body.name){
        if(await CouponModel.findOne({name:req.body.name}).select('name')){
            return res.json({message:`Coupon ${req.body.name} already exist`})
        }
        coupon.name=req.body.name;
}
if(req.body.amount){
    coupon.amount=req.body.amount;
}
await coupon.save();
return res.json({message:"Successfully",coupon})
}

export const SoftDelete=async(req,res)=>{
    const {id}=req.params;
    const coupon=await CouponModel.findOneAndUpdate({_id:id,isDeleted:false},
        {isDeleted:true},
        {new:true}
        );
        if(!coupon){
            return res.json({message:"Can`t delete this coupon"});
        }
        return res.json({message:"Success"})
 
}

export const HardDelete=async(req,res)=>{
    const {id}=req.params;
    const coupon=await CouponModel.findOneAndDelete({_id:id});
    if(!coupon){
        return res.json({message:"Can`t delete this coupon"});
    }
    return res.json({message:"Success"})

    }

    export const Restore=async(req,res)=>{
        const {id}=req.params;
        const coupon=await CouponModel.findOneAndUpdate({_id:id,isDeleted:true},
            {isDeleted:false},
            {new:true}
            );
            if(!coupon){
                return res.json({message:"Can`t restore this coupon"});
            }
            return res.json({message:"Success"})
    }
  
