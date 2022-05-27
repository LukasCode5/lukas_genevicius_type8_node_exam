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
    console.log('schema.validateAsync error invalidateUser ===', error);
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
    console.log('schema.validateAsync error in validateLoginUser ===', error);
    const formatedError = error.details.map((errorObj) => ({
      message: errorObj.message,
      field: errorObj.path[0],
    }));
    res.status(400).json(formatedError);
  }
}

async function validateBill(req, res, next) {
  const schema = Joi.object({
    token: Joi.string().required(),
    group_id: Joi.number().required(),
    amount: Joi.number().required(),
    description: Joi.string().trim().min(5).required(),
  });
  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    console.log('schema.validateAsync error in validateBill ===', error);
    const formatedError = error.details.map((errorObj) => ({
      message: errorObj.message,
      field: errorObj.path[0],
    }));
    res.status(400).json(formatedError);
  }
}

async function validateGroup(req, res, next) {
  const newGroup = {
    token: req.body.token,
    name: req.body.name,
  };

  const schema = Joi.object({
    token: Joi.string().required(),
    name: Joi.string().trim().min(5).required(),
  });
  try {
    await schema.validateAsync(newGroup, { abortEarly: false });
    next();
  } catch (error) {
    console.log('schema.validateAsync error in validateGroup ===', error);
    const formatedError = error.details.map((errorObj) => ({
      message: errorObj.message,
      field: errorObj.path[0],
    }));
    res.status(400).json(formatedError);
  }
}

async function validateToken(req, res, next) {
  const tokenFromHeaders = req.headers.authorization?.split(' ')[1];

  if (!tokenFromHeaders) {
    res.status(401).json({
      success: false,
      error: 'no token found',
    });
    return;
  }

  try {
    const tokenPayload = jwt.verify(tokenFromHeaders, jwtSecret);
    const { userId } = tokenPayload;

    req.body.userId = userId;

    next();
  } catch (error) {
    console.log('jwt.verify error in validateToken ===', error);
    res.status(403).json({
      success: false,
      error: 'invalid token',
    });
  }
}

async function validateTokenPost(req, res, next) {
  const tokenFromPost = req.body.token;

  if (!tokenFromPost) {
    res.status(401).json({
      success: false,
      error: 'no token found',
    });
    return;
  }

  try {
    const tokenPayload = jwt.verify(tokenFromPost, jwtSecret);
    // console.log('tokenPayload in post ===', tokenPayload);
    const { userId } = tokenPayload;
    // console.log('userId in post ===', userId);

    req.body.userId = userId;

    next();
  } catch (error) {
    console.log('jwt.verify error in validateTokenPost ===', error);
    res.status(403).json({
      success: false,
      error: 'invalid token',
    });
  }
}

module.exports = {
  showBody,
  validateUser,
  validateLoginUser,
  validateToken,
  validateTokenPost,
  validateBill,
  validateGroup,
};
