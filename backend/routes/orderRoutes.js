import express from 'express';
import Order from '../models/orderModel.js';

import { isAuth } from '../utils.js';
import expressAsyncHandler from 'express-async-handler';

const orderRouter = express.Router();
orderRouter.post(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const newOrder = new Order({
      orderItems: req.body.orderItems.map((x) => ({ ...x, product: x._id })),
      paymentMethod: req.body.paymentMethod,
      itemsPrice: req.body.itemsPrice,
      taxPrice: req.body.taxPrice,
      totalPrice: req.body.totalPrice,
      user: req.user._id,
      pickUpLocation: req.body.pickUpLocation,
    });

    const order = await newOrder.save();
    res.status(201).send({ message: 'New Order Created', order });
  })
);

orderRouter.get(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);
export default orderRouter;
