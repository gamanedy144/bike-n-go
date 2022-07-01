import express from 'express';
import Store from '../models/storesModel.js';

const storeRouter = express.Router();

storeRouter.get('/', async (req, res) => {
  const stores = await Store.find();
  res.send(stores);
});

storeRouter.get('/slug/:slug', async (req, res) => {
  const store = await Store.findOne({ slug: req.params.slug });
  if (store) {
    res.send(store);
  } else {
    res.status(404).send({ message: 'Store not found' });
  }
});
storeRouter.get('/:id', async (req, res) => {
  const store = await Store.findById(req.params.id);
  if (store) {
    res.send(store);
  } else {
    res.status(404).send({ message: 'Product not found' });
  }
});

export default storeRouter;
