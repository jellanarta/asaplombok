const Joi = require('joi');

const dueDateSchema = Joi.date()
  .required()
  .messages({
    'date.base': 'DueDate must be a valid date.',
    'any.required': 'DueDate is required.'
  });
const statusSchema = Joi.string()
  .valid('PENDING', 'IN_PROGRESS', 'COMPLETED')
  .required()
  .messages({
    'string.base': 'Status must be a string.',
    'any.only': 'Status must be one of {#valids}.',
    'any.required': 'Status is required.'
  });

const titleSchema = Joi.string()
  .min(5)
  .max(255)
  .required()
  .messages({
    'string.base': 'Title must be a string.',
    'string.empty': 'Title cannot be empty.',
    'string.min': 'Title must have at least {#limit} characters.',
    'string.max': 'Title cannot exceed {#limit} characters.',
    'any.required': 'Title is required.'
  })
const descriptionSchema = Joi.string()
  .min(5)
  .max(500)
  .required()
  .messages({
    'string.base': 'Description must be a string.',
    'string.empty': 'Description cannot be empty.',
    'string.min': 'Description must have at least {#limit} characters.',
    'string.max': 'Description cannot exceed {#limit} characters.',
    'any.required': 'Description is required.'
  })


// Validation schema for tasks
const CrudValidationSchema = Joi.object({
  title: titleSchema,
  description: descriptionSchema,
  dueDate: dueDateSchema,
  status: statusSchema
});


module.exports = {
  CrudValidationSchema,
  dueDateSchema,
  statusSchema,
  titleSchema,
  descriptionSchema
};
