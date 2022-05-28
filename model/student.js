const Joi = require('@hapi/joi');

 exports.STUDENT_MODEL = Joi.object({
    s_id: Joi.string(),
    name: Joi.string().min(3).max(100).required(),
    age: Joi.number().required(),
    rank: Joi.number().integer().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
})

exports.STUDENT_LOGIN_MODEL = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
})
