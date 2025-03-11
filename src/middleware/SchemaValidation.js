import Joi from 'joi';

////REGISTER VALIDATION
const registerSchema = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string().email(),

});

export const registerValidation = (req, res, next) => {
    const { error } = registerSchema.validate(req.body);
    if (error) {
        console.log(error.message);
        return res.status(400).json({
            status: 400,
            message: error.details[0].message
        });
    }
    next();
};


////LOGIN VALIDATION
const loginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
});

export const loginValidation = (req, res, next) => {
    const { error } = loginSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            status: 400,
            message: error.details[0].message
        });
    }
    next();
};

