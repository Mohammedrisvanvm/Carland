"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJwt = exports.jwtSign = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dirname = "./././";
// const privateKey = fs.readFileSync(
//   path.join(dirname, "keys", "rsa.key"),
//   "utf8"
// );
// // const publicKey = fs.readFileSync(path.join(__dirname, 'keys', 'rsa.key.pub'), 'utf8')
// const publicKey = fs.readFileSync(path.join(__dirname), "utf-8");
// console.log(publicKey);
const jwtSign = (payload, expiresIn) => {
    return jsonwebtoken_1.default.sign(payload, process.env.RSAPRIVATE, {
        algorithm: "RS256",
        expiresIn,
    });
};
exports.jwtSign = jwtSign;
const verifyJwt = (token) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.RSAPUBLIC);
        return { payload: decoded, expired: false };
    }
    catch (error) {
        return { expired: error.message.includes("jwt expired") };
    }
};
exports.verifyJwt = verifyJwt;
//# sourceMappingURL=jwtutils.js.map