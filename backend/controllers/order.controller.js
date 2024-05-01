import Order from "../models/order.model.js";
import User from "../models/user.model.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//placing order for frontend

const placeOrder = async (req, res) => {
  try {
    const order = new Order({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    await order.save();

    const user = await User.findByIdAndUpdate(req.body.userId, {
      cartData: {},
    });

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charge",
        },
        unit_amount: 2 * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/verify-order?success=true&orderId=${order._id}`,
      cancel_url: `${process.env.FRONTEND_URL}/verify-order?success=false&orderId=${order._id}`,
    });

    res.status(201).json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Error in place order server" });
  }
};

//webhooks are used to get the payment status from stripe

const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success) {
      await Order.findByIdAndUpdate(orderId, {
        status: "Order confirmed",
        payment: true,
      });
      res
        .status(200)
        .json({ success: true, message: "Order placed successfully" });
    } else {
      await Order.findByIdAndDelete(orderId);
      res.status(200).json({ success: false, message: "Order failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error in verify order server" });
  }
};

//getting user orders for admin-panel
const userOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.body.userId });
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error in user orders" });
  }
};

const listOrders = async (req, res) => {
  try {
    const order = await Order.find({});
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error in list orders" });
  }
};

//updating order status for admin-panel
const updateOrderStatus = async (req, res) => {
  try {
    await Order.findByIdAndUpdate(req.body.orderId, {
      status: req.body.status,
    });
    res
      .status(200)
      .json({ success: true, message: "Order status updated successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Error in update order status" });
  }
};

export { placeOrder, verifyOrder, userOrders, listOrders, updateOrderStatus };
