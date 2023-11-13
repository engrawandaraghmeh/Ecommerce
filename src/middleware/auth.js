export const auth=()=>{
    return(req,res,next)=>{
        const {autherization}=req.headers;
        if(!autherization){
            return res.status().json({message:"Invalid autherization"});
        }
        next();
    }
}