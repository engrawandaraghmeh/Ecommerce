import jwt from "jsonwebtoken";
import UserModel from '../../DB/model/user.model.js';

export const roles={
    Admin:'Admin',User:'User',hr:"HR",supar:"Supar"
};
export const auth=(accessRoles=[])=>{
    return async(req,res,next)=>{
        const {autherization}=req.headers;
        if(!autherization?.startsWith(process.env.PERARKEY)){
            return res.status(400).json({message:"Invalid autherization"});
        }
const token=autherization.split(process.env.PERARKEY)[1] ;

const decoded=jwt.verify(token,process.env.LOGINSECRET);

if(! decoded){
    return res.json({message:"Invalid autherization"})
}
const user=await UserModel.findById(decoded.id).select("username role");

if(! user){
    return res.json({message:"not register user"})
}
if(!accessRoles.includes(user.role)){
    return res.status(403).json({message:"Not Auth User"})
}
req.user=user;
        next();
    }
}