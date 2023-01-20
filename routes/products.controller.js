const { validateProduct } = require('../validators/product.validator')
const productService = require('../services/product/products.service')

const allowedSortFields = ['name', 'price', 'brand', 'category', 'location', 'condition'];

// GET ALL THE PRODUCTS
exports.getAllProducts = async (req, res) => {
    try {
        const sortBy = allowedSortFields.includes(req.query.sortBy) ? req.query.sortBy : 'name';
        const sortOrder = ['asc', 'desc'].includes(req.query.sortOrder) ? req.query.sortOrder : 'asc';

        const products = await productService.getAll(
            parseInt(req.query.page) || 1,
            parseInt(req.query.limit) || 10,
            req.query.category || null,
            sortBy, sortOrder
        )
        return res.status(201).json(products);
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

//Get by ID Method
exports.getProductById = async (req, res) => {
    return res.status(201).json(res.product);
}

// DELETE PRODUCT
exports.deleteById = async (req, res) => {
    try {
        // the newImgs from client is from res.product.images from middleware
        const deletedCat = await productService.deleteById(req.params.id, res.product.images)
        return res.status(201).json(deletedCat)
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: error.message })
    }
}

// UPLOAD PRODUCT IMG
exports.uploadImg = async (req, res) => {
    try {
        const files = await productService.uploadImg(req.files)
        return res.status(201).json(files)
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: error.message })
    }
}


// CREATE THE PRODUCT
exports.createProduct = async (req, res) => {
    try {
        const value = validateProduct(req.body)
        const product = await productService.createProduct(value)
        return res.status(201).json(product);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
}


// PATCH (UPDATE) PRODUCT DETAIL
exports.updateProduct = async (req, res) => {
    try {
        const value = validateProduct(req.body)
        const product = await productService.updateProduct(value, res.product)
        return res.status(201).json(product);
    } catch (error) {
        console.log(error)
        return res.status(404).json({ message: error.message });
    }
}


// In controller file, usually the structure will be:
// rmb to include try catch error
// validate coming data
// service method to do db logic
// return res.json data