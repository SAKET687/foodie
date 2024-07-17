import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect("mongodb+srv://testingmine87:TfkRGpVCvjHjSnkg@cluster0.c1p04el.mongodb.net/full-stack-copy").then(() => {
        { console.log(`db connected`) }
    })
}