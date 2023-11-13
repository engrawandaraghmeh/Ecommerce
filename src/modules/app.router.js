import connectDB from '../../DB/connection.js'
import CategoriesRouter from './categories/categories.router.js'
import ProductsRouter from './products/products.router.js'
import subcategoryRouter from './subcategory/subcategory.router.js'
import AuthRouter from './auth/auth.router.js'
import CouponRouter from './Coupon/coupon.router.js'

const initApp=(app,express)=>{
    app.use(express.json())
    connectDB();

    app.use('/auth',AuthRouter);
    
    app.use('/categories',CategoriesRouter);
    app.use('/products',ProductsRouter);
    app.use('/subcategory',subcategoryRouter);
    app.use('/coupon',CouponRouter)

    app.get('/',(req,res)=>{
        return res.status(200).json({message:"Welcome e-commerce"});
    })
    app.get('*',(req,res)=>{
        return res.status(500).json({message:"Page Not Exist"})
    })
}

export default initApp;