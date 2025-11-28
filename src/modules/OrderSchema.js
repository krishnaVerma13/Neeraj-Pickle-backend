const mongoose = require("mongoose");

const PackagingSchema = new mongoose.Schema({
    productQuantity: { type: Number, required: true },
    price: { type: Number, required: true },          // product price or bpPrice
    orderUnit: { type: String, required: true },
    orderQuantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true }      // orderQuantity * price
});

const ProductOrderSchema = new mongoose.Schema({
    image: { type: String },
    name: { type: String, required: true },
    category: { type: String, required: true },

    packaging: [PackagingSchema],                     // multiple packing types

    totalProductAmount: { type: Number, required: true } // sum of all packaging totalPrice
});

const OrderSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    userCity: { type: String, required: true },
    transportation: { type: Number, default: 0 },

    productOrders: [ProductOrderSchema],               // list of all products in order

    totalBill: { type: Number, required: true }        // sum(product amounts + transportation)
}, { timestamps: true });

module.exports = mongoose.model("Order", OrderSchema);
