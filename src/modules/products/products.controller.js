import slugify from "slugify";
import CategoryModel from "../../../DB/model/category.model.js";
import subCategoryModel from "../../../DB/model/subcategory.model.js";
import cloudinary from "../../services/cloudinary.js";
import ProductModel from "../../../DB/model/product.model.js";


export const getProducts=(req,res)=>{
    return res.json("Products...")
}

export const createProduct=async(req,res)=>{
    
    const {name,price,discount,categoryId,subcategoryid}=req.body;


    const checkCategory=await CategoryModel.findById(categoryId);

    if(!checkCategory){
        return res.status(404).json({message:"category not found"})
    }

    const checkSubCategory=await subCategoryModel.findById(subcategoryid);

    if(!checkSubCategory){
        return res.status(404).json({message:"subcategory not found"})
    }
    req.body.slug=slugify(name);
    req.body.finalPrice=price-(price*(discount||0)/100).toFixed(2);
   
   const {secure_url,public_id}=await cloudinary.uploader.upload(req.files.mainImage[0].path,
   { folder:`${process.env.AppName}//mainImage`});


    req.body.mainImage={secure_url,public_id};
    req.body.subImage=[];
    for(const file of req.files.subImage){
        const {secure_url,public_id}=await cloudinary.uploader.upload(file.path,
            { folder:`${process.env.AppName}/product/subImage`});
            req.body.subImage.push({
                secure_url,public_id

            })
    }

    req.body.createdBy=req.user._id;
    req.body.updateBy=req.user._id;
     const product=await ProductModel.create(req.body);
     if(!product)
     {
        return res.status(404).json({message:"Error While Creating Product"})
     }


    return res.json({message:"Success",product});

}