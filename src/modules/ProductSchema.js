const mongoose = require('mongoose')

const packeging = mongoose.Schema({
    productQuentity :{type : String},
    price : {type : Number},
    OrderUnit : {type : String , },
    bigPackagSize : {type: Number},
    bpPrice:{type:Number}
});

const ProductSchema = mongoose.Schema({
    name : {
        type: String,
        require : true
    },
    category : {
        type: String,
        require : true
    },
    packeging : {
        type: [packeging],
        default : []
    },
    image :{
        type : String,
        require : true
    }
},{
    timestamps : true
});

module.exports = mongoose.model('Product', ProductSchema);