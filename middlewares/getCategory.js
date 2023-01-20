const Category = require('../model/category')

// CATEGORY MIDDLEWARE
async function getCategory(req, res, next) {
    let category
    try {
        category = await Category.findOne({ slug: req.params.slug })
        if (category == null) {
            return res.status(404).json({ message: 'cannot find category' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
    res.category = category
    next()
}

module.exports = { getCategory }