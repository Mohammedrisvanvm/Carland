"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateCount = void 0;
function dateCount(pickUpDate, dropDate) {
    const timeDifference = dropDate.getTime() - pickUpDate.getTime();
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
    return Math.round(daysDifference);
}
exports.dateCount = dateCount;
//# sourceMappingURL=dateCount.js.map