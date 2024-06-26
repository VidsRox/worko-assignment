const Joi = require('joi')

const createUserSchema = Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().required(),
    age: Joi.number().integer().min(0).required(),
    city: Joi.string().required(),
    zipCode: Joi.string().regex(/^\d{5}$/).required()
});

const updateUserSchema = Joi.object({
    email: Joi.string().email(),
    name: Joi.string(),
    age: Joi.number().integer().min(0),
    city: Joi.string(),
    zipCode: Joi.string().regex(/^\d{5}$/)
}).or('email', 'name', 'age', 'city', 'zipCode');

module.exports = {
    createUserSchema,
    updateUserSchema
};