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
    createdBy:{type:Types.ObjectId,ref:"User",required:true},
    updateBy:{type:Types.ObjectId,ref:"User",required:true}
}
,{
    timestamps:true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}

});
CategorySchema.virtual('subcategory',{
    localField:'_id',
    foreignField :"categoryId",
    ref:'SubCategory'
})

const CategoryModel=mongoose.models.Category||model('Category',CategorySchema);
export default CategoryModel;