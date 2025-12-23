const asyncHandler = require('express-async-handler')
const ApiResponce = require('../utils/ApiResponce')
const CustomizeOrder = require('../modules/CustomizeOrderSchema')

const CustomizeOrderCreate = asyncHandler(async (req, res)=>{
    const orderData = req.body;
    // console.log("request body :",orderData);
    
    if (!orderData) {
        return res.json(new ApiResponce(400, "Order data is required", null, null));
    }

    const order = await CustomizeOrder.create(orderData);

    console.log("New customize order created:");

    return res.json(new ApiResponce(201, "Order created successfully!", order, null));
})

const getCustomizeAllOrders = asyncHandler(async (req, res) => {
    const data = await CustomizeOrder.find();

    // console.log("All orders data:", data);
    console.log("get All customize orders API call:");

    if (data.length > 0) {
        return res.json(new ApiResponce(200, "All orders fetched successfully!", data, null));
    } else {
        return res.json(new ApiResponce(404, "No orders found", null, null));
    }
});

const updateCustomizeOrder = asyncHandler(async (req, res) => {
    const orderId = req.params.id;
    const updateData = req.body;

    if (!updateData) {
        return res.json(new ApiResponce(400, "Update data not provided", null, null));
    }

    const updated = await CustomizeOrder.findByIdAndUpdate(orderId, updateData, { new: true });

    console.log("Updated order:", updated);

    if (!updated) {
        return res.json(new ApiResponce(404, "Order not found", null, null));
    }

    return res.json(new ApiResponce(200, "Order updated successfully", updated, null));
});

const deleteCustomizeOrder = asyncHandler(async (req, res) => {
    const orderId = req.params.id;

    const deleted = await CustomizeOrder.findByIdAndDelete(orderId);

    console.log("Order deleted:", deleted);

    if (!deleted) {
        return res.json(new ApiResponce(404, "Order not found", null, null));
    }

    return res.json(new ApiResponce(200, "Order deleted successfully", deleted, null));
});

const updateCustomizeOrderState = asyncHandler(async (req, res) => {
    const orderId = req.params.id;
    const { orderStatus  } = req.body;
        // console.log(orderStatus);
        
    if (orderStatus == null) {
        return res.json(new ApiResponce(400, "Order status is required", null, null));
    }

    const updated = await CustomizeOrder.findByIdAndUpdate(
        orderId,
        { orderStatus },
        { new: true }
    );

    console.log("orderStatus Updated:", updated);

    if (!updated) {
        return res.json(new ApiResponce(404, "Order not found", null, null));
    }

    return res.json(new ApiResponce(200, "orderStatus updated successfully", updated, null));
});

module.exports = {
    CustomizeOrderCreate,
    getCustomizeAllOrders,
    updateCustomizeOrder,
    deleteCustomizeOrder,
    updateCustomizeOrderState
}