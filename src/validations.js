import { body } from 'express-validator';

export const createBookValidations = [
  body('title').isLength({ min: 3, max: 255 }),
  body('content').isLength({ min: 10 }),
  body('authors')
    .isArray({ min: 1 })
    .isLength({ min: 3 })
    .withMessage('Minimal 3 karakter'),
];

export const updateBookValidations = [
  body('title').isLength({ min: 3, max: 255 }).optional(),
  body('content').isLength({ min: 10 }).optional(),
  body('authors')
    .isArray({ min: 1 })
    .isLength({ min: 3 })
    .withMessage('Minimal 3 karakter')
    .optional(),
];
