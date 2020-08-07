const Joi = require('@hapi/joi');

const schema = Joi.object({
    body: Joi.string()
            .min(1)
            .max(200)
            .required(),
    username: Joi.string()
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