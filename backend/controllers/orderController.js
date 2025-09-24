import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from 'stripe';
import foodModel from "../models/foodModel.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
const DELIVERY_CHARGE = 2;

const placeOrder = async (req, res) => {
    try {
        const userId = req.userId;
        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        const userEmail = userData.email;

        let line_items = [];
        let totalAmount = 0;

        for (const item of req.body.items) {
            const foodData = await foodModel.findById(item._id);
            if (!foodData) {
                return res.status(404).json({ success: false, message: `Food item with id ${item._id} not found` });
            }
            line_items.push({
                price_data: {
                    currency: "usd",
                    product_data: { name: foodData.name, images: [foodData.image] },
                    unit_amount: Math.round(foodData.price * 100)
                },
                quantity: item.quantity
            });
            totalAmount += foodData.price * item.quantity;
        }

        if (totalAmount > 0) {
            line_items.push({
                price_data: {
                    currency: "usd",
                    product_data: { name: "Delivery Charges" },
                    unit_amount: Math.round(DELIVERY_CHARGE * 100)
                },
                quantity: 1
            });
            totalAmount += DELIVERY_CHARGE;
        }
        const newOrder = new orderModel({
            userId: userId,
            items: req.body.items,
            amount: totalAmount,
            address: req.body.address,
            isScheduled: req.body.isScheduled,
            scheduledDeliveryTime: req.body.isScheduled ? req.body.scheduledDeliveryTime : null
        });
        await newOrder.save();
        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: line_items,
            mode: 'payment',
            success_url: `${FRONTEND_URL}/myorders?success=true`,
            cancel_url: `${FRONTEND_URL}/cart?canceled=true`,
            metadata: {
                orderId: newOrder._id.toString(),
                isScheduled: req.body.isScheduled ? 'true' : 'false'
            },
            customer_email: userEmail
        });

        res.json({ success: true, session_url: session.url });

    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const stripeWebhook = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        console.error(`Webhook signature verification failed.`, err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        const orderId = session.metadata.orderId;
        const isScheduled = session.metadata.isScheduled === 'true';
        const newStatus = isScheduled ? "Scheduled" : "Food Processing";

        if (orderId) {
            await orderModel.findByIdAndUpdate(orderId, {
                payment: true,
                status: newStatus
            });
            console.log(`Order ${orderId} has been paid. Status set to: ${newStatus}`);
        }
    }

    res.status(200).json({ received: true });
};
const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.userId });
        res.json({ success: true, data: orders });
    } catch (error) {
        console.error("Error fetching user orders:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, data: orders });
    } catch (error) {
        console.error("Error listing all orders:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
        res.json({ success: true, message: "Status Updated" });
    } catch (error) {
        console.error("Error updating order status:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
export { placeOrder, userOrders, listOrders, updateStatus, stripeWebhook };