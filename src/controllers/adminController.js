const ApiResponce = require('../utils/ApiResponce');
const asyncHandler = require('express-async-handler');
const Product = require('../modules/ProductSchema')
const fs = require('fs')
const { upload } = require("../configer/upload")
const path = require('path');
const { findOne } = require('../modules/OrderSchema');
const uploadimages = upload("product").fields([
    { name: 'product_image', maxCount: 10 },
]);

const createProduct = asyncHandler(async (req, res) => {

    // --- 1. Extract ONLY ONE IMAGE (first one) ---
    let imagePath = null;

    if (req.files?.product_image?.length > 0) {
        const file = req.files.product_image[0];  // take first file only
        imagePath = `uploads/product/${file.filename}`;
    }

    // --- 2. Parse packeging into Array ---
    let packegingData;
    try {
        packegingData = JSON.parse(req.body.packeging);
    } catch (err) {
        return res.json(new ApiResponce(400, "Invalid Packaging JSON format", null, err.message));
    }

    const { name, category } = req.body;

    // --- 3. Validate required fields ---
    if (!name || !category || !packegingData) {
        return res.json(new ApiResponce(400, "All fields are required", null, null));
    }

    // --- 4. Final cleaned product object ---
    const productPayload = {
        image: imagePath,        // ONLY a string here 🔥
        name,
        category,
        packeging: packegingData
    };

    // --- 5. Save to DB ---
    const data = await Product.create(productPayload);

    return res.json(new ApiResponce(200, "Product created successfully", data, null));
});



const getAllProduct = asyncHandler(async (req, res) => {
    console.log("api call get all product !!");
    
    const data = await Product.find()

    // console.log("all product data :-", data);
    if (data.length > 0) {
        return res.json(new ApiResponce(200, "All product fetched successfully!", data, null));
    } else {
        return res.json(new ApiResponce(404, "No product found", null, null));
    }
})

const updateProduct = asyncHandler(async (req, res) => {
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

const getProductByCategory = asyncHandler(async (req, res) => {
    const { category } = req.params;

    const data = await Product.find({ category });

    if (data.length === 0) {
        return res.json(new ApiResponce(404, "No product found for this category", null, null));
    }

    return res.json(new ApiResponce(200, "Products fetched successfully", data, null));
})

const getProductByid = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const data = await Product.findById(id);

    if (!data) {
        return res.json(new ApiResponce(404, "Product not found", null, null));
    }

    return res.json(new ApiResponce(200, "Product fetched successfully", data, null));
})

const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    console.log("delete product APi call :");
    const pro = await Product.findById(id)
    // console.log("product details :", pro.image);

    fs.unlink(pro.image, (err) => {
        if (err) {
    return res.json(new ApiResponce(400, "An error occurred:",null, err));
         }
        console.log('File deleted successfully!');
    });

    if (!id) {
        return res.json(new ApiResponce(400, "Product ID not provided", null, null));
    }

    const deleted = await Product.findByIdAndDelete(id);
    //  console.log(deleted);

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
    deleteProduct,
    uploadimages
}