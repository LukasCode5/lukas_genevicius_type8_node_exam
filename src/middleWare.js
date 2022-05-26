const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('./config');

function showBody(req, res, next) {
  if (req.method === 'POST') {
    console.log('request body ===', req.body);
  }
  next();
}

async function validateUser(req, res, next) {
  const schema = Joi.object({
    full_name: Joi.string().trim().required(),
    // eslint-disable-next-line newline-per-chained-call
    email: Joi.string().trim().email().lowercase().required(),
    // eslint-disable-next-line newline-per-chained-call
    password: Joi.string().trim().min(5).max(15).required(),
  });
  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    console.log('schema.validateAsync error ===', error);
    const formatedError = error.details.map((errorObj) => ({
      message: errorObj.message,
      field: errorObj.path[0],
    }));
    res.status(400).json(formatedError);
  }
}

async function validateLoginUser(req, res, next) {
  const schema = Joi.object({
    email: Joi.string().trim().email().lowercase().required(),
    // eslint-disable-next-line newline-per-chained-call
    password: Joi.string().trim().min(5).max(15).required(),
  });
  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    console.log('schema.validateAsync error ===', error);
    const formatedError = error.details.map((errorObj) => ({
      message: errorObj.message,
      field: errorObj.path[0],
    }));
    res.status(400).json(formatedError);
  }
}

module.exports = {
  showBody,
  validateUser,
  validateLoginUser,
};
