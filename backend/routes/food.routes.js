import express from "express";
import {
  addFood,
  listFood,
  removeFood,
} from "../controllers/food.controller.js";
import multer from "multer";

const foodRouter = express.Router();

//multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

foodRouter.post("/add-food", upload.single("image"), addFood);
foodRouter.get("/list-food", listFood);
foodRouter.post("/remove-food", removeFood);

export default foodRouter;
