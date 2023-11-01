"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.outputDate = void 0;
const date = new Date();
exports.outputDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "numeric",
    hour12: true,
});
//# sourceMappingURL=currentDateTime.js.map