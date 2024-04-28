import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/food.routes.js";

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

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
