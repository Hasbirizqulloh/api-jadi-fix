import Joi from 'joi';

const registerUserValidation = Joi.object({
  password: Joi.string().max(100).required(),
  email: Joi.string().max(100).required(),
  nama: Joi.string().max(100).required(),
  role: Joi.string().max(100).required(),
});

const loginUserValidation = Joi.object({
  email: Joi.string().max(100).required(),
  password: Joi.string().max(100).required(),
});

const getUserValidation = Joi.string().max(100).required();

const getUserIdValidation = Joi.number().required();

const updateUserValidation = Joi.object({
  userId: Joi.number().required(),
  password: Joi.string().max(100).optional(),
  nama: Joi.string().max(100).optional(),
  email: Joi.string().max(100).optional(),
  role: Joi.string().max(100).optional(),
});

export { registerUserValidation, loginUserValidation, getUserValidation, updateUserValidation, getUserIdValidation };
