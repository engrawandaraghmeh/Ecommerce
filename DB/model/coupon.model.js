import mongoose,{Schema,Types,model} from "mongoose";
const CouponSchema=new Schema ({
name:{
    type:String,
    required:true,
    unique:true,
},
amount:{type:Number,required:true},
usedBy:[{type:Types.ObjectId,ref:'User'}],
expireDate:Date,
createdBy:{type:Types.ObjectId,res:'User'},
updatedBy:{type:Types.ObjectId,ref:'User'},

isDeleted:{
    type:Boolean,
    default:false,
}

},
{
    timestamps:true,
}

);
const CouponModel=mongoose.model.Coupon||model('Coupon',CouponSchema);
export default CouponModel;