import mongoose,{Schema,Types,model} from "mongoose";
const ProductSchema=new Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        trim:true 
    },
    slug:{
        type:String,
        required:true
    }   ,
    description:{
        type:String,
        required:true
    }   ,
    stock:{
        type:Number,
        default:1
    },
    price:{
        type:Number,
        required:true
    },
    discount:{
        type:Number,
        default:0
    },
    finalPrice:{
    type:Number
    },
    nuumber_saller:{
        type:Number,
        default:0
    },
    mainImage:{
    type:Object,
    required:true
    },
    
   subImage:{
   type:Object,
   required:true
    },
    status:{
        type:String,
        default:"Active",
        enum:["Active","InActive"]
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
    color:[String],
    sizes:[{
type:String,
enum:['s','m','xl','lg']
    }],
    categoryId:{type:Types.ObjectId,ref:'Category',required:true},
    subcategoryid:{type:Types.ObjectId,ref:'SubCategory',required:true},
    createdBy:{type:Types.ObjectId,ref:"User",required:true},
    updateBy:{type:Types.ObjectId,ref:"User",required:true}
}

,{
    timestamps:true,

});


const ProductModel=mongoose.models.Product||model('s',ProductSchema);
export default ProductModel;