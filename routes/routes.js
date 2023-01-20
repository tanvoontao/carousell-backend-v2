const express = require('express')
const router = express.Router();

// MIDDLEWARE
const { getProduct } = require('../middlewares/getProduct')
const { getCategory } = require('../middlewares/getCategory')
const { uploadHandler } = require('../middlewares/uploadHandler')

// ROUTES CONTROLLER
const categoryRoutes = require('./category.controller');
const productRoutes = require('./products.controller');


// PRODUCT API
router.get('/products', productRoutes.getAllProducts)
router.get('/products/:id', getProduct, productRoutes.getProductById)
router.delete('/products/:id', getProduct, productRoutes.deleteById)
router.post('/products/uploadImg', uploadHandler.any(), productRoutes.uploadImg)
router.post('/products', productRoutes.createProduct)
router.patch('/products/:id', getProduct, productRoutes.updateProduct)


// CATEGORY API
router.get('/categories', categoryRoutes.getAllCategories)
router.get('/categories/total', categoryRoutes.getTotal)
router.get('/categories/:slug', getCategory, categoryRoutes.getCategoryBySlug)
router.delete('/categories/:id', categoryRoutes.deleteById)
router.post('/categories/uploadImg', uploadHandler.any(), categoryRoutes.uploadImg)
router.post('/categories', categoryRoutes.createCategory)
router.patch('/categories/:slug', getCategory, categoryRoutes.updateCategory)

module.exports = router