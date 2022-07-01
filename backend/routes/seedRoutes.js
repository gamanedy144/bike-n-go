import express from 'express';
import Product from '../models/productModel.js';
import User from '../models/userModel.js';
import Store from '../models/storesModel.js';
import data from '../data.js';
const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
  await Product.deleteMany({});
  const createdProducts = await Product.insertMany(data.products);

  await User.deleteMany({});
  const createdUsers = await User.insertMany(data.users);

  await Store.deleteMany({});
  const createdStores = await Store.insertMany(data.stores);

  res.send({ createdProducts, createdUsers, createdStores });
});
export default seedRouter;
