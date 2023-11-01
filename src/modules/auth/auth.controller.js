import UserModel from "../../../DB/model/user.model.js";
import bycrpt from 'bcryptjs';
import cloudinary from "../../services/cloudinary.js";
import jwt from "jsonwebtoken";

export const signup=async(req,res)=>{
    try{
        const {username,email,password}=req.body;
        const user=await UserModel.findOne({email});
        if(user){
            return res.status(409).json({message:"email is exist"})
        }
        const hashPassword=await bycrpt.hash(password,parseInt(process.env.SALTROUND));
        
        const {secure_url,public_id}= await cloudinary.uploader.upload(req.file.path,{
            folder:`${process.env.AppName}/users`
        })
    
        const createUser=await UserModel.create({username,email,password:hashPassword,image:{secure_url,public_id}});
        return res.status(201).json({message:"Success",createUser});
    }catch(err){
        return res.json(err);
    }
   
}

export const signin=async(req,res)=>{
    const {email,password}=req.body;
    const user=await UserModel.findOne({email});

    if(!user){
        return res.status(400).json({message:"Email not Found"})
    }
    const match=await bycrpt.compare(password,user.password);
    if(!match){
        return res.status(400).json({message:"Invalid Password"})
    }
    const token=jwt.sign({id:user._id,role:user.role,status:user.status},process.env.LOGINSECRET,{expiresIn:'5m'});

    const refreshtoken=jwt.sign({id:user._id,role:user.role,status:user.status},process.env.LOGINSECRET,{expiresIn:'1m'})
  
    return res.status(200).json({message:"Success",token,refreshtoken});

}