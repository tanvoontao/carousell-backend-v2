const Product = require('../../model/product')
const { Storage } = require('@google-cloud/storage');

exports.createProduct = async (value) => {
    const product = new Product(value)
    await product.save()
    return product
}

exports.getAll = async (page, limit, category = null, sortBy = 'name', sortOrder = 'asc') => {
    const skip = (page - 1) * limit;

    let query = {};
    if (category) {
        query.category = category;
    }

    return await Product.find(query).skip(skip).limit(limit).sort([[sortBy, sortOrder]]);
}

exports.deleteById = async (id, newImgs) => {

    // find the product, if not exist, then throw an error
    const product = await Product.findById(id)
    if (!product) {
        throw new Error("Product not found");
    }

    // if exist, give oldProduct to get oldimgs, give newimgs, and deleteall opt
    await deleteImgs(product, newImgs, true)
    await product.remove()
    return product;
}

exports.uploadImg = async (files) => {
    if (files.length == 0) {
        throw new Error("No files were uploaded.");
    }

    var rejectedFiles = files.filter(file => file.hasOwnProperty('error'));
    if (rejectedFiles.length > 0) {
        throw new Error("Some of the files were rejected because of invalid file type");
    }

    if (files && files.length > 0) {
        return files
    }
}

exports.updateProduct = async (value, oldProduct) => {
    oldProduct.name = value.name
    oldProduct.price = value.price
    oldProduct.brand = value.brand
    oldProduct.category = value.category
    oldProduct.location = value.location
    oldProduct.condition = value.condition
    oldProduct.description = value.description
    await deleteImgs(oldProduct, value.images)
    oldProduct.images = value.images ? value.images.map(img => `${process.env.BASE_URL}${img}`) : []
    return await oldProduct.save()
}

const deleteImgs = async (oldProduct, newImgs, deleteAll = false) => {

    const oldImgs = oldProduct.images.map(img => new URL(img).pathname.split('/').pop())

    newImgs = newImgs.map(img => new URL(img).pathname.split('/').pop())

    let imgsToDel
    if (deleteAll) {
        imgsToDel = oldImgs
    } else {
        imgsToDel = oldImgs.filter(img => !newImgs.includes(img))
    }


    // ref: https://github.com/googleapis/nodejs-storage/blob/main/samples/deleteFile.js
    const storage = new Storage({
        projectId: process.env.PROJECT_ID,
        keyFilename: process.env.KEY_FILENAME,
    });

    // delete the file from google cloud storage
    for (const filename of imgsToDel) {
        await storage.bucket(process.env.BUCKET_NAME).file(filename).delete()
    }
}