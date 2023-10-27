import mongoose,{Schema,Types,model} from "mongoose";
const CategorySchema=new Schema({
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
    createdBy:{type:Types.ObjectId,ref:"User"},
    updateBy:{type:Types.ObjectId,ref:"User"}
}
,{
    timestamps:true
});

const CategoryModel=mongoose.models.Category||model('Category',CategorySchema);
export default CategoryModel;