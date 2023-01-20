const Product = require('../model/product')

async function getProduct(req, res, next) {

    let product
    try {
        product = await Product.findById(req.params.id);
        if (product == null) {
            return res.status(404).json({ message: 'cannot find product' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
    res.product = product
    next()
}

module.exports = { getProduct }