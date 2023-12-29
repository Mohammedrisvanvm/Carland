"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardDetailsAdmin = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const bookingSchema_1 = __importDefault(require("../../models/bookingSchema"));
exports.dashboardDetailsAdmin = (0, express_async_handler_1.default)(async (req, res) => {
    const data = await bookingSchema_1.default.aggregate([
        {
            $group: {
                _id: null,
                totalAmountCompleted: {
                    $sum: {
                        $cond: [{ $eq: ["$status", "Completed"] }, "$totalPrice", 0],
                    },
                },
                totalOrders: { $sum: 1 },
                totalUsers: { $addToSet: "$userId" },
                totalPickup: {
                    $sum: { $cond: [{ $eq: ["$status", "PickUp"] }, 1, 0] },
                },
                totalPickUpreq: {
                    $sum: { $cond: [{ $eq: ["$status", "pickUpreq"] }, 1, 0] },
                },
                totalOngoing: {
                    $sum: { $cond: [{ $eq: ["$status", "Ongoing"] }, 1, 0] },
                },
                totalDropOffReq: {
                    $sum: { $cond: [{ $eq: ["$status", "dropOffReq"] }, 1, 0] },
                },
                totalCompleted: {
                    $sum: { $cond: [{ $eq: ["$status", "Completed"] }, 1, 0] },
                },
                totalCancelled: {
                    $sum: { $cond: [{ $eq: ["$status", "Cancelled"] }, 1, 0] },
                },
            },
        },
        {
            $project: {
                _id: 0,
                totalAmountCompleted: 1,
                totalOrders: 1,
                totalUsers: { $size: "$totalUsers" },
                totalCancelled: 1,
                totalOngoing: 1,
                totalPickup: 1,
                totalDropOffReq: 1,
                totalPickUpreq: 1,
                totalCompleted: 1,
            },
        },
    ]);
    const resultArray = [];
    if (data.length > 0) {
        const firstResult = data[0];
        for (const key in firstResult) {
            if (typeof firstResult[key] === "number" &&
                key != "totalAmountCompleted" &&
                key != "totalOrders" &&
                key != "totalUsers") {
                resultArray.push(firstResult[key]);
            }
        }
    }
    res.status(200).json({
        message: "dashboard Details Admin",
        dashboardDetails: { data, resultArray },
    });
});
//# sourceMappingURL=dashboardManagement.js.map