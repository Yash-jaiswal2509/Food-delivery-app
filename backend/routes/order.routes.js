import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  placeOrder,
  verifyOrder,
  userOrders,
  listOrders,
  updateOrderStatus,
} from "../controllers/order.controller.js";
const router = express.Router();

router.post("/place-order", authMiddleware, placeOrder);
router.post("/verify-order", verifyOrder);
router.post("/user-orders", authMiddleware, userOrders);
router.get("/list-orders", listOrders);
router.post("/update-order-status", updateOrderStatus);

export default router;
