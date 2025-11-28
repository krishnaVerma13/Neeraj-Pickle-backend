const asyncHandler = require('express-async-handler')
const Order = require('../modules/OrderSchema')
const ApiResponce = require('../utils/ApiResponce')

const createOrder = asyncHandler(async (req, res) => {
    const orderData = req.body;

    if (!orderData) {
        return res.json(new ApiResponce(400, "Order data is required", null, null));
    }

    const order = await Order.create(orderData);

    console.log("New order created:", order);

    return res.json(new ApiResponce(201, "Order created successfully!", order, null));
});

const getAllOrders = asyncHandler(async (req, res) => {
    const data = await Order.find();

    console.log("All orders data:", data);

    if (data.length > 0) {
        return res.json(new ApiResponce(200, "All orders fetched successfully!", data, null));
    } else {
        return res.json(new ApiResponce(404, "No orders found", null, null));
    }
});

const getOrderById = asyncHandler(async (req, res) => {
    const id = req.params.id;

    const data = await Order.findById(id);

    console.log("Order fetched by ID:", data);

    if (!data) {
        return res.json(new ApiResponce(404, "Order not found", null, null));
    }

    return res.json(new ApiResponce(200, "Order fetched successfully!", data, null));
});

const updateOrder = asyncHandler(async (req, res) => {
    const orderId = req.params.id;
    const updateData = req.body;

    if (!updateData) {
        return res.json(new ApiResponce(400, "Update data not provided", null, null));
    }

    const updated = await Order.findByIdAndUpdate(orderId, updateData, { new: true });

    console.log("Updated order:", updated);

    if (!updated) {
        return res.json(new ApiResponce(404, "Order not found", null, null));
    }

    return res.json(new ApiResponce(200, "Order updated successfully", updated, null));
});

const deleteOrder = asyncHandler(async (req, res) => {
    const orderId = req.params.id;

    const deleted = await Order.findByIdAndDelete(orderId);

    console.log("Order deleted:", deleted);

    if (!deleted) {
        return res.json(new ApiResponce(404, "Order not found", null, null));
    }

    return res.json(new ApiResponce(200, "Order deleted successfully", deleted, null));
});

const getOrdersByCity = asyncHandler(async (req, res) => {
    const city = req.params.city;

    const data = await Order.find({ userCity: city });

    console.log("Orders by city:", data);

    if (data.length === 0) {
        return res.json(new ApiResponce(404, "No orders found for this city", null, null));
    }

    return res.json(new ApiResponce(200, "Orders fetched successfully", data, null));
});

const updateTotalBill = asyncHandler(async (req, res) => {
    const orderId = req.params.id;
    const { totalBill } = req.body;

    if (totalBill == null) {
        return res.json(new ApiResponce(400, "totalBill is required", null, null));
    }

    const updated = await Order.findByIdAndUpdate(
        orderId,
        { totalBill },
        { new: true }
    );

    console.log("Total Bill Updated:", updated);

    if (!updated) {
        return res.json(new ApiResponce(404, "Order not found", null, null));
    }

    return res.json(new ApiResponce(200, "Total bill updated successfully", updated, null));
});

module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrder,
    deleteOrder,
    getOrdersByCity,
    updateTotalBill
};

