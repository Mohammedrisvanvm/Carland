"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseImages = void 0;
const multer_1 = __importDefault(require("multer"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const storage = multer_1.default.memoryStorage();
// type CustomFile = Express.Multer.File & { fieldname: string };
// const storage = multer.diskStorage({
//   destination: (
//     req: Request,
//     file: CustomFile,
//     cb: (error: Error | null, destination: string) => void
//   ) => {
//     cb(null, "public/uploads");
//   },
//   filename: (
//     req: Request,
//     file: CustomFile,
//     cb: (error: Error | null, filename: string) => void
//   ) => {
//     const uniqueSuffix = Date.now() + ".jpg";
//     cb(null, file.fieldname + "-" + uniqueSuffix);
//   },
// });
const fileFilter = (req, file, cb) => {
    if (!["image/png", "image/jpg", "image/jpeg"].includes(file?.mimetype)) {
        return cb(new Error("Not an image"));
    }
    return cb(null, true);
};
const upload = (0, multer_1.default)({
    storage,
    fileFilter,
    limits: { fileSize: 5242880 },
});
exports.parseImages = (0, express_async_handler_1.default)((req, res, next) => {
    upload.array("images")(req, res, (err) => {
        if (err) {
            if (err.message === "Not an image") {
                return next(new Error("Not an image"));
            }
            if (err.message === "File too large") {
                return next(new Error("File too large"));
            }
            upload.single("images")(req, res, (err) => {
                if (err) {
                    if (err.message === "Not an image") {
                        return next(new Error("Not an image"));
                    }
                    if (err.message === "File too large") {
                        return next(new Error("File too large"));
                    }
                }
                return next();
            });
        }
        else {
            return next();
        }
    });
});
//# sourceMappingURL=multer.js.map