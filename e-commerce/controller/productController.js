const { Product} = require("../model/productSchema")
require("express-async-errors");

const createProduct = async(req, res, next)=>{
    try{
        let emailId = req.body.email || '';
        let colour = req.body.product[0].colour || '';
        let size = req.body.product[0].size || '';
        if(!emailId){
            throw new Error("Please provide email id");
        }
        let user = await Product.findOne({email: emailId});
        if(user){
            let products = user.product || [];
            console.log(products);
            let isProductAvailable = products.find((product)=>
                product.colour === colour && product.size === size
            )
            if(isProductAvailable){
                throw new Error("Product already exists");
            } 
            user.product.push(req.body.product[0]);
            await user.save();
            res.status(200).send("New Product successfully added to existing items" + user)
        }
        let newUser = await Product.create(req.body);
        res.status(200).send("Product successfully created"+ newUser)
        
    } catch(err){
        throw new Error("Error in creating product" + err)
    }
}

const updateProduct = async (req, res, next)=>{
    try{
        let emailId = req.params.email;
        let colour = req.params.colour;
        let size = req.params.size;
        let newColour = req.body.colour;
        let newSize = req.body.size;
        let newAmount = req.body.amount;
        if(!emailId || ! colour || ! size){
            throw new Error("Please provide email, colour and size")
        }
        let user = await Product.findOne({email: emailId});
        if(!user){
            throw new Error("User not exists!")
        }
        let products = user.product || [];
        let productIndex = products.findIndex((product)=>
                product.colour === colour && product.size === size
        )
        if(productIndex == -1){
            throw new Error("Product not available");
        }

        user.product.splice(productIndex, 1, {
            colour: newColour,
            size: newSize || user.product[productIndex].size,
            amount: newAmount || user.product[productIndex].amount
        })
        let updatedProducts = await user.save();
        res.status(200).json(updatedProducts);
    } catch(err){
        throw new Error("Error in updating product" + err)
    }
}

const deleteProduct = async (req, res, next)=>{
    try{
        let emailId = req.params.email;
        let colour = req.params.colour;
        let size = req.params.size;
        if(!emailId || ! colour || ! size){
            throw new Error("Please provide email, colour and size")
        }
        let user = await Product.findOne({email: emailId});
        if(!user){
            throw new Error("User not exists!")
        }
        let products = user.product || [];
        let productIndex = products.findIndex((product)=>
                product.colour === colour && product.size === size
        )
        if(productIndex == -1){
            throw new Error("Product not available");
        }
        user.product.splice(productIndex, 1);
        await user.save();
        res.status(200).json(user)
    }
    catch(err){
        throw new Error("Error in deleting product" + err)
    }
}

const getProduct = async (req, res, next)=>{
    try{
        let products = await Product.find({});
        if(!products.length){
            throw new Error("No Products Available")
        }
        res.status(200).json(products);
    }
    catch(err){
        throw new Error("Error in getting products"+ err)
    }
}

module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getProduct
}

