const { validateCategory } = require('../validators/category.validator')
const categoryService = require('../services/category/category.service')
const { convertToSlug } = require('../helpers/convertToSlug')


// GET ALL THE CATEGORIES
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await categoryService.getAll(
            parseInt(req.query.page) || 1,
            parseInt(req.query.limit) || 5,
            req.query.search || null
        )
        return res.status(201).json(categories);
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

// GET TOTAL OF CATEGORIES
// take note that this function should be before the /categories/:slug
// so it wont conflict
exports.getTotal = async (req, res) => {
    try {
        const count = await categoryService.getTotal()
        return res.json({ count });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


// GET CATEGORY BY SLUG
exports.getCategoryBySlug = async (req, res) => {
    return res.status(201).json(res.category);
}

// DELETE CATEGORY
exports.deleteById = async (req, res) => {
    try {
        return res.status(201).json(await categoryService.deleteById(req.params.id));
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}

// CREATE CATEGORY DATA
exports.createCategory = async (req, res) => {
    try {
        req.body.slug = convertToSlug(req.body.name);
        const value = validateCategory(req.body)
        const category = await categoryService.createCategory(value)
        return res.status(201).json(category);
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: error.message });
    }
}


// img link - https://storage.googleapis.com/carousell-clone-image-v2/...png
// UPLOAD CATEGORY IMAGE TO GOOGLE CLOUD STORAGE
exports.uploadImg = async (req, res) => {
    try {
        const files = await categoryService.uploadImg(req.files)
        return res.status(201).json(files)
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: error.message })
    }
}

// PATCH (UPDATE) CATEGORY DETAIL
exports.updateCategory = async (req, res) => {
    try {
        const value = validateCategory(req.body)
        const category = await categoryService.updateCategory(value, res.category)
        return res.status(201).json(category);
    } catch (error) {
        console.log(error)
        return res.status(404).json({ message: error.message });
    }
}



// ---------- Documentation ---------- //


// ---------- References ---------- //
// 200 OK: The request was successful and the response contains the requested information.
// 301 Moved Permanently: The requested resource has been permanently moved to a new location.
// 302 Found: The requested resource is temporarily located at a different location.
// 304 Not Modified: The client's cached version of the resource is up to date.
// 400 Bad Request: The request could not be understood by the server due to invalid syntax.
// 401 Unauthorized: The request requires user authentication.
// 403 Forbidden: The server refuses to fulfill the request.
// 404 Not Found: The requested resource could not be found.
// 500 Internal Server Error: An internal server error occurred while processing the request.
