import slugify from "slugify";
import CategoryModel from "../../../DB/model/category.model.js";
import SubCategoryModel from "../../../DB/model/subcategory.model.js";
import cloudinary from '../../services/cloudinary.js'

export const CreateSubCategory=async(req,res)=>{
   const{name,categoryId}=req.body;
   const subcategory=await SubCategoryModel.findOne({name});

   if(subcategory){
    return res.status(409).json({message:`SubCategory ${name} already exist`})
   }

   const category=await CategoryModel.findById(categoryId);



   if(!category){
    return res.status(404).json({message:"Category Not Found"});

   }
   const {secure_url,public_id}= await cloudinary.uploader.upload(req.file.path,{
    folder:`${process.env.AppName}/subcategories`
})
const subCategory=await SubCategoryModel.create({name,slug:slugify(name),categoryId,image:{secure_url,public_id}});
return res.json({message:"Successful",subCategory})
 
}


export const GetSubCategory=async(req,res)=>{

   
        const categoryId=req.params.id;
     
        
        const category=await CategoryModel.findById(categoryId);
       
        if(!category){
            return res.json({message:"Category not found"});
        }
        const subcategories=await SubCategoryModel.find({categoryId}).populate({
            path:'categoryId'
        })
        return res.json({message:"Success",subcategories})
   
  
    
    
}
