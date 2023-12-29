"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userStatus = void 0;
const userStatus = (req, res, next) => {
    if (!req.user) {
        return res.status(403).send('invalid session');
    }
    return next();
};
exports.userStatus = userStatus;
//# sourceMappingURL=userStatus.js.map