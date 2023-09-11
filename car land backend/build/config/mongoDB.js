"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBconnect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config");
const DBconnect = () => {
    mongoose_1.default.connect(config_1.config.mongo.url, { retryWrites: true, w: 'majority' }).then(() => console.log("db connected")).catch((error) => {
        console.log(error);
    });
};
exports.DBconnect = DBconnect;
//# sourceMappingURL=mongoDB.js.map