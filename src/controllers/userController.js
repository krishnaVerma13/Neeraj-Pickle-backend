const ApiResponce = require('../utils/ApiResponce').default;
const asyncHandler = require('express-async-handler');

const customizeOrder = asyncHandler(async(req , res)=>{})
const getAllProduct = asyncHandler(async(req , res)=>{})
const getProductByCategory = asyncHandler(async(req , res)=>{})

module.exports = {
    customizeOrder,
    getAllProduct,
    getProductByCategory,
    
}