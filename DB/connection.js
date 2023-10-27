import mongoose from "mongoose";
const connectDB=async()=>{
    return await mongoose.connect(process.env.DB).then(
        ()=>{
            console.log("Connect Successfuly");
        }
    ).catch((err)=>{
        console.log(`Error Connectio ${err}`);
    })

}

export default connectDB;