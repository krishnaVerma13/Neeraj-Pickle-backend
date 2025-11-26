const ApiResponce = require('../utils/ApiResponce').default;
const asyncHandler = require('express-async-handler');
const Product  = require('../modules/ProductSchema')

const createProduct = asyncHandler(async(req , res)=>{
    // console.log("------000000000000000000000000000000000000-",req);
    // console.log("======",req.body);
    
    const proData = req.body;
    const  {name , category, packeging , image}= req.body;
     if(!name || !category|| !packeging || !image){
        return res.json(new ApiResponce(400 , "All Filds are require ",null,null))
     }

     
     console.log("product data : ",proData)

     const data = await Product.create(proData);
     console.log("res :", data);
     
     if(!data){
        return res.json(new ApiResponce(400 , "product not create ",null,null))
     }
        return res.json(new ApiResponce(200 , "product created in database",data,null))
        
    }
)

     
const getAllProduct = asyncHandler(async(req , res)=>{
    const data = await Product.find()
    
    console.log("all product data :-", data);
  if (data.length > 0) {
    return res.json(new ApiResponce(200, "All product fetched successfully!", data, null));
  } else {
    return res.json(new ApiResponce(404, "No product found", null, null));
  }
})

const updateProduct = asyncHandler(async(req , res)=>{
     const productId = req.params.id;
    const updateData = req.body;

    if (!updateData) {
        return res.json(new ApiResponce(400, "Update data not provided", null, null));
    }

    const updated = await Product.findByIdAndUpdate(productId, updateData, { new: true });

    if (!updated) {
        return res.json(new ApiResponce(404, "Product not found", null, null));
    }

    return res.json(new ApiResponce(200, "Product updated successfully", updated, null));
})

const getProductByCategory = asyncHandler(async(req , res)=>{
     const { category } = req.params;

    const data = await Product.find({ category });

    if (data.length === 0) {
        return res.json(new ApiResponce(404, "No product found for this category", null, null));
    }

    return res.json(new ApiResponce(200, "Products fetched successfully", data, null));
})

const getProductByid = asyncHandler(async(req , res)=>{
     const { id } = req.params;

    const data = await Product.findById(id);

    if (!data) {
        return res.json(new ApiResponce(404, "Product not found", null, null));
    }

    return res.json(new ApiResponce(200, "Product fetched successfully", data, null));
})

const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    console.log(id);
    
    if (!id) {
        return res.json(new ApiResponce(400, "Product ID not provided", null, null));
    }

    const deleted = await Product.findByIdAndDelete(id);
 console.log(deleted);
 
    if (!deleted) {
        return res.json(new ApiResponce(404, "Product not found", null, null));
    }

    return res.json(new ApiResponce(200, "Product deleted successfully", deleted, null));
});

module.exports = {
    createProduct,
    updateProduct,
    getAllProduct,
    getProductByCategory,
    getProductByid,
    deleteProduct
}