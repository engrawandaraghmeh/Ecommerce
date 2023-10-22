import CategoriesRouter from './categories/categories.router.js'
import ProductsRouter from './products/products.router.js'

const initApp=(app,express)=>{
    app.use(express.json())
    
    app.use('/categories',CategoriesRouter);
    app.use('/products',ProductsRouter);


    app.get('/',(req,res)=>{
        return res.status(200).json({message:"Welcome e-commerce"});
    })
    app.get('*',(req,res)=>{
        return res.status(500).json({message:"Page Not Exist"})
    })
}

export default initApp;