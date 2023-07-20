import { Router } from 'express';
import { requireApiKey, validationMiddleware } from './middlewares.js';
import { createBookValidations, updateBookValidations } from './validations.js';

const router = Router();

let DATA = [];

router.get('/books', (req, res) => {
  res.send({ data: DATA });
});

router.get('/books/:id', (req, res) => {
  const { id } = req.params;
  const book = DATA.find((item) => item.id === id);

  if (!book) {
    res.status(404).send({ message: 'Not Found' });
    return;
  }

  res.send({ data: book });
});

router.post(
  '/books',
  requireApiKey,
  validationMiddleware(createBookValidations),
  (req, res) => {
    const { body } = req;
    DATA.push({
      ...body,
      id: Date.now().toString(),
    });

    res.send({
      ok: true,
    });
  }
);

router.put(
  '/books/:id',
  requireApiKey,
  validationMiddleware(updateBookValidations),
  (req, res) => {
    const { body } = req;
    const { id } = req.params;

    const bookIndex = DATA.findIndex((item) => item.id === id);

    if (bookIndex === -1) {
      res.status(404).send({ message: 'Not Found' });
      return;
    }

    DATA[bookIndex] = {
      ...DATA[bookIndex],
      ...body,
    };

    res.send({
      ok: true,
    });
  }
);

router.delete('/books/:id', (req, res) => {
  const { id } = req.params;
  const bookIndex = DATA.findIndex((item) => item.id === id);

  if (bookIndex === -1) {
    res.status(404).send({ message: 'Not Found' });
    return;
  }

  DATA.splice(bookIndex, 1);

  res.send({
    ok: true,
  });
});

export { router };
