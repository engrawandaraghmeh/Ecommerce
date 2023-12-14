import connectDB from '../../DB/connection.js'
import CategoriesRouter from './categories/categories.router.js'
import ProductsRouter from './products/products.router.js'
import subcategoryRouter from './subcategory/subcategory.router.js'
import AuthRouter from './auth/auth.router.js'
import CouponRouter from './Coupon/coupon.router.js'
import CartRouter from './cart/cart.router.js'
import OrderRouter from './order/order.router.js'
import {SendEmail} from '../services/email.js'
import { globalErrorHandling } from '../services/errorHandling.js'


const initApp=async(app,express)=>{
   // await SendEmail("rawanatif2001@gmail.com","Test","<h2>BackEnd </h2>");



    app.use(express.json());
    connectDB();

    app.use('/auth',AuthRouter);
    app.use('/categories',CategoriesRouter);
    app.use('/products',ProductsRouter);
    app.use('/subcategory',subcategoryRouter);
    app.use('/coupon',CouponRouter)
    app.use('/cart',CartRouter)
    app.use('/order',OrderRouter)

    app.get('/',(req,res)=>{
        return res.status(200).json({message:"Welcome e-commerce"});
    })
    /*
    app.get('*',(req,res)=>{
        return res.status(500).json({message:"Page Not Exist"})
    })
    */
   app.use(globalErrorHandling)
}

export default initApp;