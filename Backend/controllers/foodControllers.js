import foodModel from "../models/foodModel.js";
import fs from "fs";


// add food items
const addFood = async (req, res) => {

    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: image_filename,
        category: req.body.category,
    })

    try {
        await food.save();
        res.json({ success: true, message: "Food Added" })
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Food not Added" })
    }
}


// display food list
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods, message: "Menu details loaded successfully." })
    } 
    catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error to fetch menu details. Please try again." })
    }
}


// remove food items
const removeFood = async (req, res) => {
    try {
        const foods = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${foods.image}`, () => { })
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Food Removed" })
    } catch (error) {
        console.error(error)
        res.json({ success: false, message: "Food not Removed" })
    }
}

export { addFood, listFood, removeFood };