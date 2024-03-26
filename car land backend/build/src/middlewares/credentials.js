"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allowedOrigins = void 0;
exports.allowedOrigins = [
    "http://localhost:3000",
    "https://carlandpro.netlify.app",
];
const credentials = (req, res, next) => {
    if (exports.allowedOrigins.includes(req.headers.origin)) {
        res.header("Access-Control-Allow-Credentials", "true");
    }
    next();
};
exports.default = credentials;
//# sourceMappingURL=credentials.js.map