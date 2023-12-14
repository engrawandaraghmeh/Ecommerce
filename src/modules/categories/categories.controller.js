import slugify from "slugify";
import CategoryModel from "../../../DB/model/category.model.js";
import cloudinary from '../../services/cloudinary.js'

export const getCategories=async(req,res)=>{
    const caregories=await CategoryModel.find().populate('subcategory');
    return res.status(200).json({message:"Successful",caregories});
}

export const CreateCategory=async(req,res)=>{
    const name=req.body.name.toLowerCase();

    if(await CategoryModel.findOne({name})){
        return res.status(409).json({message:"Category name already exist"});
    }
   
   const {secure_url,public_id}= await cloudinary.uploader.upload(req.file.path,{
        folder:`${process.env.AppName}/categories`
    })
const cat=await CategoryModel.create({name,slug:slugify(name),image:{secure_url,public_id},
createdBy:req.user._id,
updateBy:req.user._id,

});
return res.status(201).json({message:"Successfuly",cat})
}

export const getSpecificCategory=async(req,res)=>{
    const {id}=req.params;
    const category=await CategoryModel.findById(id);
    return res.json({message:"Successfully",category});
}

export const updateCategory=async(req,res)=>{
    try{
    const category=await CategoryModel.findById(req.params.id);
    if(!category){
        return res.status(404).json({message:`invalid category id ${req.params.id}`})
    }

    if(req.body.name){
        if(await CategoryModel.findOne({name:req.body.name}).select('name')){
            return res.status(409).json({message:`Category ${req.body.name} already exist`})
        }
        category.name=req.body.name;
        category.slug=slugify(req.body.name);
    }
   if(req.body.status)
   {
    category.status=req.body.status;
    
   }


    if(req.file){
        const {secure_url,public_id}= await cloudinary.uploader.upload(req.file.path,{
            folder:`${process.env.AppName}/categories`
        })
        await cloudinary.uploader.destroy(category.image.public_id);
        category.image={secure_url,public_id};
    }
    category.updateBy=req.user._id;
    await category.save();
    
    return res.status(200).json({message:"Success",category});
}catch(err){
    return res.json({message:"Error",err:err})
}

}

export const ActiveCategory=async(req,res)=>{
    const caregories=await CategoryModel.find({status:"Active"});
    return res.status(200).json({message:"Successful",caregories});
   
}