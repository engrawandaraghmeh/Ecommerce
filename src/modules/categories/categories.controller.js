import slugify from "slugify";
import CategoryModel from "../../../DB/model/category.model.js";

import cloudinary from '../../services/cloudinary.js'
export const getCategories=(req,res)=>{
    return res.json("Categories...");
}

export const CreateCategory=async(req,res)=>{
    const name=req.body.name.toLowerCase();
    if(CategoryModel.findOne({name})){
        return res.status(409).json({message:"Category name already exist"});
    }
   
   const {secure_url,public_id}= await cloudinary.uploader.upload(req.file.path,{
        folder:`${process.env.AppName}/categories`
    })
const cat=await CategoryModel.create({name,slug:slugify(name),image:{secure_url,public_id}});
return res.status(201).json({message:"Successfuly",cat})
}