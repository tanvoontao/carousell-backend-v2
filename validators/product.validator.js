const Joi = require("joi");

const validator = (schema) => (payload) => {
    const { value, error } = schema.validate(payload, { abortEarly: false })

    if (error) { throw error }
    return value
}

const productSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    brand: Joi.string().required(),
    category: Joi.string().required(),
    location: Joi.string().required(),
    condition: Joi.string().required(),
    description: Joi.string().required(),
    images: Joi.array().items(Joi.string()),
    dateCreated: Joi.date().default(Date.now),
});

exports.validateProduct = validator(productSchema)


// const data = [{
//     name: 'andy'
// }, {
//     name: 'andy'
// }, {
//     name: 'andy'
// }, {
//     name: 'andy'
// }]

// const list = Joi.array().items(Joi.object({
//     name: Joi.string().required()
// }))