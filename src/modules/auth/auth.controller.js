import UserModel from "../../../DB/model/user.model.js";
import bycrpt from 'bcryptjs';
import cloudinary from "../../services/cloudinary.js";
import jwt from "jsonwebtoken";
import { SendEmail } from "../../services/email.js";




export const signup=async(req,res,next)=>{
    try{
        const {username,email,password}=req.body;
        const user=await UserModel.findOne({email});
        if(user){
      //   return res.status(409).json({message:"email is exist"})
        return next(new Error("email is exist",{cause:409}));
        }
        const hashPassword=await bycrpt.hash(password,parseInt(process.env.SALTROUND));
        
        const {secure_url,public_id}= await cloudinary.uploader.upload(req.file.path,{
            folder:`${process.env.AppName}/users`
        })

const token=jwt.sign({email},process.env.CONFIRMEMAILSECRET)   ;
    
        await SendEmail(email,"Confirm Email",`<a href='http://localhost:3000/auth/confirmEmail/${token}'>Verify</a>`);
    
        const createUser=await UserModel.create({username,email,password:hashPassword,image:{secure_url,public_id}});
        return res.status(201).json({message:"Success",createUser});
        
    }catch(err){
        return res.json({message:"Error",err:err.stack});
    }
   
}

export const signin=async(req,res,next)=>{
    const {email,password}=req.body;
    const user=await UserModel.findOne({email});

    if(!user){
        return res.status(400).json({message:"Email not Found"})
        
    }
    const match=await bycrpt.compare(password,user.password);
    if(!match){
        return res.status(400).json({message:"Invalid Password"})
    }
    const token=jwt.sign({id:user._id,role:user.role,status:user.status},process.env.LOGINSECRET);

    const refreshtoken=jwt.sign({id:user._id,role:user.role,status:user.status},process.env.LOGINSECRET,{expiresIn:'1m'})
  
    return res.status(200).json({message:"Success",token,refreshtoken});

}

export const ConfirmEmail=async(req,res)=>{
    const {token}= req.params;
    console.log(token) 
    const decoded=jwt.verify(token,process.env.CONFIRMEMAILSECRET);
    if(!decoded){
        return res.status(404).json({message:"Invalid token"})
    }
    const user=await UserModel.findOneAndUpdate({email:decoded.email,ConfirmEmail:false},
        
       {ConfirmEmail:true}
      );
      if(!user)
{
    return res.json({message:"invalid verfiy email or your email is verified"})
}       
return res.json(process.env.TW_URL);
}