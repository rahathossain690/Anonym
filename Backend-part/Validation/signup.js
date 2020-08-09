const Joi = require('@hapi/joi');

const schema = Joi.object({
    username: Joi.string()
                .min(6)
                .max(20)
                .required(),
    email: Joi.string()
            .email()
            .required(),
    password: Joi.string()
                .min(6)
                .required()
})

module.exports = (data) => {
    const val = schema.validate(data);
    if(!!val.error){
        return val.error.details[0].message;
    } else{
        return false;
    }
}