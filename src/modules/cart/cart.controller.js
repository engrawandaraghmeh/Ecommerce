import CartModel from "../../../DB/model/cart.model.js"
import ProductModel from "../../../DB/model/product.model.js"

export const createCart = async (req, res) => {
  const { productId, quantity } = req.body;
  // const product = await ProductModel.findById(productId)
  // if (!product) {
  //     return next(new Error('Product not found', { cause: 400 }));

  // }
  const cart = await CartModel.findOne({ userId: req.user._id })
  if (!cart) {

    const newCart = await CartModel.create({
      userId: req.user._id,
      products: [{ productId, quantity }]
    });
    return res.status(201).json({ message: 'success', newCart })
  }

  let matchProduct = false;

  for (let i = 0; i < cart.products; i++) {
    if (cart.products[i].productId == productId) {
      cart.products[i].quantity == quantity;
      matchProduct = true;
      break;
    }
  }
  if (!matchProduct) {
    cart.products.push({ productId, quantity });
  }
  await cart.save();

  return res.status(201).json({ message: "Success", cart })
}

export const deleteItem=async(req,res)=>{
  const {productId}=req.body;
  await CartModel.updateOne({userId:req.user._id},{
    $pull:{
      products:{
        productId
      }
    }

  })
return res.json({message:"OKKK"})

}
export const ClearCart=async(req,res)=>{
  const ClearCart=await CartModel.updateOne({userId:req.user._id},
   { products:[]
  },
    
    )
    return res.status(200).json({message:"Success"})
}
export const getCart=async(req,res)=>{
  const cart=await CartModel.findOne({userId:req.user._id});
  return res.status(200).json({message:"Success",cart:cart})
}