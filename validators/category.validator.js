const Joi = require("joi");

const validator = (schema) => (payload) => {
    const { value, error } = schema.validate(payload, { abortEarly: false })

    if (error) { throw error }
    return value
}

const categorySchema = Joi.object({
    id: Joi.string().optional().default(null),
    slug: Joi.string().regex(/^\S+$/).min(3).max(30).required(),
    name: Joi.string().min(3).max(30).required(),
    description: Joi.string().min(10).max(500).required(),
    images: Joi.string().optional().allow("",null)
})

exports.validateCategory = validator(categorySchema)