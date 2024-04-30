import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/food.routes.js";
import userRouter from "./routes/user.routes.js";
import cartRouter from "./routes/cart.routes.js";
import "dotenv/config";

const app = express();
const PORT = 4000;

//middleware
app.use(cors());
app.use(express.json());

//db connection
connectDB();

app.get("/health", (req, res) => {
  res.send("Hello from the server side!");
});

//routes
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
