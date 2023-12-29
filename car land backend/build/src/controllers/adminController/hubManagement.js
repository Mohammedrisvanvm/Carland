"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hubSearch = exports.verifyHub = exports.banHub = exports.getAllHubs = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const hubSchema_1 = __importDefault(require("../../models/hubSchema"));
exports.getAllHubs = (0, express_async_handler_1.default)(async (req, res) => {
    const search = req.query.search;
    const currentPage = req.query.currentPage;
    const skip = (Number(currentPage) - 1) * 5;
    const hubs = await hubSchema_1.default
        .find({
        $or: [
            {
                hubName: { $regex: search, $options: "i" },
            },
        ],
    })
        .skip(skip)
        .limit(5)
        .sort({ createdAt: -1 });
    // const hubs: Ihub[] = await hubModel.find()
    const count = await hubSchema_1.default.countDocuments();
    res.json({ hubs, count });
});
exports.banHub = (0, express_async_handler_1.default)(async (req, res) => {
    const id = req.body.value;
    const hub = await hubSchema_1.default.findById(id);
    if (hub) {
        hub.ban = !hub.ban;
        await hub.save();
    }
    res.status(200).json({ message: "success" });
});
exports.verifyHub = (0, express_async_handler_1.default)(async (req, res) => {
    const id = req.body.value;
    const hub = await hubSchema_1.default.findById(id);
    if (hub) {
        hub.isVerified = !hub.isVerified;
        await hub.save();
    }
    res.status(200).json({ message: "success" });
});
exports.hubSearch = (0, express_async_handler_1.default)(async (req, res) => {
    const { search } = req.query;
    const hubs = await hubSchema_1.default.find({
        hubName: new RegExp(search, "i"),
    });
    res.json({ hubs });
});
//# sourceMappingURL=hubManagement.js.map