const express = require('express');
const { createProduct, getAllProduct, updateProduct, getProductByCategory, getProductByid, deleteProduct } = require('../controllers/adminController');
const router = express.Router()

const multer = require('multer')

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/createProduct' , createProduct)
router.get('/getAllProduct' , getAllProduct)
router.patch('/updateProduct/:id' , updateProduct)
router.get('/getProductByCategory/:category' , getProductByCategory)
router.get('/getProductByid/:id' , getProductByid)
router.get('/getProductByid/:id' , getProductByid)
router.put('/productDelete/:id', deleteProduct);

module.exports = router ;