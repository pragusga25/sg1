import { validationResult } from 'express-validator';

const API_KEY = 'secret';

export const validationMiddleware = (validations) => {
  return async (req, res, next) => {
    for (let validation of validations) {
      const result = await validation.run(req);
      if (result.errors.length) break;
    }

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(400).json({ errors: errors.array() });
  };
};

export const requireApiKey = (req, res, next) => {
  const { headers } = req;

  const apiKey = headers['x-api-key'];

  if (apiKey !== API_KEY) {
    res.status(401).send({ message: 'Unauthorized' });
    return;
  }

  next();
};
