import Food from "../models/food.model.js";
import fs from "fs";

const addFood = async (req, res) => {
  let image_filename = `${req.file.filename}`;

  const food = new Food({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    image: image_filename,
    category: req.body.category,
  });

  try {
    await food.save();
    res.json({ success: true, message: "Food added successfully!" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Failed to add food!" });
  }
};

const listFood = async (req, res) => {
  try {
    const foods = await Food.find(); //sending all the data of food in the list
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Failed to fetch food!" });
  }
};

const removeFood = async (req, res) => {
  try {
    const food = await Food.findById(req.body.id); //we got the food, now we can delete it
    fs.unlink(`uploads/${food.image}`, () => {}); //deleting the image from the uploads folder
    await Food.findByIdAndDelete(req.body.id); //deleting the food from the database
    res.json({ success: true, message: "Food deleted successfully!" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Failed to delete food!" });
  }
};

export { addFood, listFood, removeFood };
