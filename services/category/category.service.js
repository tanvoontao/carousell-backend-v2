const Category = require('../../model/category')
const { Storage } = require('@google-cloud/storage');
const { convertToSlug } = require('../../helpers/convertToSlug')

exports.getAll = async (page, limit, keyword = null) => {
    const skip = (page - 1) * limit;

    if (keyword) {
        return await Category.find({ name: { $regex: keyword, $options: 'i' } }).skip(skip).limit(limit);
    } else {
        return await Category.find().skip(skip).limit(limit);
    }
}

exports.deleteById = async (id) => {

    const category = await Category.findById(id);
    if (category) {
        await deleteOldImg(id);
        await category.remove();
        return category;
    }
    throw new Error("Category not found");
}

exports.createCategory = async (value) => {
    const { slug, name, description, images } = value
    const category = new Category({
        slug: slug,
        name: name,
        description: description,
        images: `${process.env.BASE_URL}${images}`,
    })
    return await category.save()
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

exports.updateCategory = async (value, oldCategory) => {
    const { id, slug, name, description, images } = value

    oldCategory.name = name
    oldCategory.slug = convertToSlug(name)
    oldCategory.description = description

    if (images != "" && images != null) {
        await deleteOldImg(id)
        oldCategory.images = `${process.env.BASE_URL}${images}`
    }
    return await oldCategory.save()
}

exports.getTotal = async () => {
    const count = await Category.countDocuments();
    return count;
}

const deleteOldImg = async (id) => {
    // delete old images from GCS

    // get the filename from mongodb based on param id passed in
    const category = await Category.findById(id)
    const imgLink = new URL(category.images);
    const filename = imgLink.pathname.split('/').pop();
    // console.log(filename)

    // ref: https://github.com/googleapis/nodejs-storage/blob/main/samples/deleteFile.js
    const storage = new Storage({
        projectId: process.env.PROJECT_ID,
        keyFilename: process.env.KEY_FILENAME,
    });

    // delete the file from google cloud storage
    await storage.bucket(process.env.BUCKET_NAME).file(filename).delete();

}