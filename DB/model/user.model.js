import mongoose,{Schema,model} from "mongoose";
const UserSchema=new Schema({
    username:{
        type:String,
        required:true,
        min:4,
        max:20,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    image:{
        type:Object
    },
    phone:{
        type:String
    },
    confirmemail:{
        type:Boolean,
        default:false
    },
    gender:{
        type:String,
        enum:['Male','Female']
    },
    role:{
        type:String,
        default:"User",
        enum:['User','Admin']
    },
    status:{
        type:String,
        default:"Active",
        enum:['Active',"InActive"]
    }

}
,{
    timestamps:true
});

const UserModel=mongoose.models.User||model('User',UserSchema);
export default UserModel;