import joi from 'joi';
export const GeneralFields={
    email:joi.string().email().required().messages({
        'string.empty':"Email is required",
        'string.email':"plz enter valid email"
    }),
    password:joi.string().required().messages({
        'string.empty':"Password is required"
    }),
    file:joi.object({
        size:joi.number().required().positive(),
        path:joi.number().required().positive(),
        filename:joi.number().required().positive(),
        mimetype:joi.number().required().positive(),
        encoding:joi.number().required().positive(),
        originalname:joi.number().required().positive(),
        fieldname:joi.number().required().positive(),
        dest:joi.string()
    })
  }

export const validation=(schema)=>{
    return(req,res,next)=>{
    const inputsDate={...req.body,...req.params,...req.query};

    if(req.file||req.files){
      inputsDate.file=req.file||req.files;
    }
    const validationResult=schema.validate(inputsDate,{abortEarly:false});
    
    if(validationResult.error?.details){
   return res.status(400).json({message:"Validation Error",
   validationError:validationResult.error?.details
})


    }
    next()
    }

}