import Joi from 'joi';

const createReportValidation = Joi.object({
  report: Joi.string().max(100).required(),
});

const updateReportValidation = Joi.object({
  id: Joi.number().required(),
  status: Joi.string().max(100).optional(),
});

const getReportValidation = Joi.number().positive().required();

export { createReportValidation, updateReportValidation, getReportValidation };
