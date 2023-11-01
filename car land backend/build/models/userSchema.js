"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userSchema = new mongoose_1.Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
    },
    googleId: {
        type: String,
    },
    image: {
        type: String,
    },
    gender: {
        type: String,
        default: null
    },
    phone_number: {
        type: Number,
        default: null
    },
    verified_email: {
        type: Boolean,
        default: true,
    },
    verified_phonenumber: {
        type: Boolean,
        default: false,
    },
    ban: {
        type: Boolean,
        default: false,
    },
    license: {
        type: (Array),
        required: false
    },
    adhaar: {
        type: (Array),
        required: false
    },
    profileVerificationRequest: {
        type: Boolean,
        default: false,
    },
    verifiedProfile: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt_1.default.genSalt(10);
    this.password = await bcrypt_1.default.hash(this.password, salt);
});
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt_1.default.compare(enteredPassword, this.password);
};
const userModel = (0, mongoose_1.model)("user", userSchema);
exports.default = userModel;
//# sourceMappingURL=userSchema.js.map