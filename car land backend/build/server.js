"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoDB_1 = require("./config/mongoDB");
const app = (0, express_1.default)();
(0, mongoDB_1.DBconnect)();
app.get('/', (req, res) => {
    res.send("hai");
});
app.listen(3131, () => console.log('server connected @3131'));
