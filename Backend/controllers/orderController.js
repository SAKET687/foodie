import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe("sk_test_51PckRjRreQH8GMuoxpWhEWd6KRjvb58AaPDPxhscje59dCCHXVPtKFHUU9BJYBKndBV4cFyOaU0AhAA7KoI3vTBm00HOqduWXE");

// for placing user's order from frontend

const placeOrder = async (request, response) => {


    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));


    const frontendUrl = "http://localhost:5174";

    try {
        const newOrder = new orderModel({
            userId: request.body.userId,
            items: request.body.items,
            amount: request.body.amount,
            address: request.body.address,
        })
        await newOrder.save();
        // await userModel.findByIdAndUpdate(request.body.userId, { cartData: {} });
        const line_items = request.body.items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100 * 80,
            },
            quantity: item.quantity,
        }))
        line_items.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: 2 * 100 * 83.54,
            }, quantity: 1,
        })
        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontendUrl}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontendUrl}/verify?success=false&orderId=${newOrder._id}`,
        })
        response.json({ success: true, session_url: session.url, message: "Payment Processed," })
        await delay(5000);
    } catch (error) {
        console.log(error);
        console.log("Payment execution failed.");
        response.json({ success: false, message: error })
    }
};


const verifyOrder = async (request, response) => {
    const { orderId, success } = request.body;
    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            response.json({ success: true, message: "Amount Paid" });
        } else {
            await orderModel.findByIdAndDelete(orderId);
            response.json({ success: false, message: "Amount isn't Paid" });
        }
    } catch (error) {
        console.log(error);
        response.json({ success: false, message: error });
    }
}


const userOrders = async (request, response) => {
    try {
        const orders = await orderModel.find({userId: request.body.userId});
        response.json({ success: true, data: orders, message: "Orders fetched successfully." })
    } catch (error) {
        console.log("Error to fetch order details.");
        console.log(error);
        response.json({ success: false, message: error })
    }
}

export { placeOrder, verifyOrder, userOrders };