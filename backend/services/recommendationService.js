import orderModel from '../models/orderModel.js';
import userModel from '../models/userModel.js';
import foodModel from '../models/foodModel.js';
import CollaborativeFilter from 'collaborative-filter';

export const updateAllUserRecommendations = async () => {
    console.log("Starting recommendation model update...");
    try {
        const allOrders = await orderModel.find({});
        const allUsers = await userModel.find({}, '_id');
        const allFoods = await foodModel.find({}, '_id');

        if (allOrders.length < 10) {
            console.log("Not enough order data to build a meaningful model. Exiting.");
            return;
        }

        const userIds = allUsers.map(user => user._id.toString());
        const foodIds = allFoods.map(food => food._id.toString());

        const userItemMatrix = new Array(userIds.length).fill(0).map(() => new Array(foodIds.length).fill(0));

        const userIndexMap = new Map(userIds.map((id, index) => [id, index]));
        const foodIndexMap = new Map(foodIds.map((id, index) => [id, index]));

        allOrders.forEach(order => {
            const userIndex = userIndexMap.get(order.userId);
            if (userIndex !== undefined) {
                order.items.forEach(item => {
                    const foodIndex = foodIndexMap.get(item._id.toString());
                    if (foodIndex !== undefined) {
                        userItemMatrix[userIndex][foodIndex] += item.quantity;
                    }
                });
            }
        });

        const cf = new CollaborativeFilter(userItemMatrix);

        // Tạo và lưu gợi ý cho từng người dùng
        for (let i = 0; i < userIds.length; i++) {
            try {
                const userId = userIds[i];
                const recommendations = cf.getRecommendations(i);

                const top10Recs = recommendations
                    .slice(0, 10)
                    .map(rec => foodIds[rec.itemIndex]);
                if (top10Recs.length > 0) {
                    await userModel.findByIdAndUpdate(userId, {
                        mlRecommendations: top10Recs
                    });
                }

            } catch (error) {
                console.warn(`Could not generate recommendations for user index ${i}. Error: ${error.message}. Skipping.`);
            }
        }

        console.log("Successfully updated recommendations for all users.");

    } catch (error) {
        console.error("A critical error occurred during recommendation update:", error);
    }
};