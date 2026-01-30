import Joi from 'joi';

export const loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.email': 'Please enter a valid email address',
      'string.empty': 'Email is required',
      'any.required': 'Email is required'
    }),
  password: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.min': 'Password must be at least 6 characters',
      'string.empty': 'Password is required',
      'any.required': 'Password is required'
    })
});

export const validateLogin = (data) => {
  const { error, value } = loginSchema.validate(data, { abortEarly: false });
  
  if (!error) return { isValid: true, errors: null, value };

  const formattedErrors = {};
  error.details.forEach((detail) => {
    formattedErrors[detail.context.key] = detail.message;
  });

  return { isValid: false, errors: formattedErrors, value };
};
