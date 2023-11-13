import mongoose,{Schema,Types,model} from "mongoose";
const subCategorySchema=new Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    }, 
    image:{
        type:Object,
        required:true
    },
    slug:{
        type:String,
        required:true
    }   ,
    status:{
        type:String,
        default:"Active",
        enum:["Active","InActive"]
    },
    categoryId:{type:Types.ObjectId,ref:'Category',required:true},
    createdBy:{type:Types.ObjectId,ref:"User"},
    updateBy:{type:Types.ObjectId,ref:"User"}
}
,{
    timestamps:true
});
const subCategoryModel=mongoose.models.subCategory||model('subCategory',subCategorySchema);
export default subCategoryModel;