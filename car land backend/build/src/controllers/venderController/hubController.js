"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileDataUpdate = exports.profileData = exports.dashboardDetails = exports.getHubs = exports.addhub = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const hubSchema_1 = __importDefault(require("../../models/hubSchema"));
const cloudinary_1 = __importDefault(require("../../config/cloudinary"));
const vendorSchema_1 = __importDefault(require("../../models/vendorSchema"));
const bookingSchema_1 = __importDefault(require("../../models/bookingSchema"));
exports.addhub = (0, express_async_handler_1.default)(async (req, res) => {
    const { hubName, pincode, validityDate, license, hubImage, hubMultiImage, placeName, location, } = req.body.values;
    const hub = await hubSchema_1.default.findOne({ hubName });
    if (!hub) {
        const images = await Promise.all([
            cloudinary_1.default.uploader.upload(hubImage, { folder: "hub" }),
            cloudinary_1.default.uploader.upload(license, { folder: "hubdoc" }),
        ]);
        const multi = await Promise.all(hubMultiImage.map(async (image) => {
            const response = await cloudinary_1.default.uploader.upload(image, {
                folder: "hub",
            });
            return response.url;
        }));
        const hub = await hubSchema_1.default.create({
            hubName,
            location,
            placeName,
            pincode,
            validityDate,
            license: images[1].url,
            hubImage: images[0].url,
            hubMultiImage: multi,
        });
        await vendorSchema_1.default.findOneAndUpdate({ phoneNumber: req.headers.authorization }, { $addToSet: { renthubs: hub._id } });
        res.json({ message: `created new hub ${hub.hubName}` });
    }
    else {
        throw new Error("hub already exist");
    }
});
exports.getHubs = (0, express_async_handler_1.default)(async (req, res) => {
    const accessTokenvendor = req.cookies.accessTokenvendor;
    if (!accessTokenvendor) {
        throw new Error("accessToken not available");
    }
    const dbout = await vendorSchema_1.default.findOne({ phoneNumber: req.headers.authorization }, { renthubs: 1, _id: 0 });
    const hubs = await hubSchema_1.default.find({ _id: { $in: dbout.renthubs } });
    res.json({ hubs });
});
exports.dashboardDetails = (0, express_async_handler_1.default)(async (req, res) => {
    const id = req.query.hubId;
    const data = await bookingSchema_1.default.aggregate([
        { $match: { hubId: id } },
        {
            $group: {
                _id: null,
                totalAmountCompleted: {
                    $sum: {
                        $cond: [{ $eq: ["$status", "Completed"] }, "$totalPrice", 0],
                    },
                },
                totalOrders: { $sum: 1 },
                totalUsers: { $addToSet: "$userId" },
                totalPickup: {
                    $sum: { $cond: [{ $eq: ["$status", "PickUp"] }, 1, 0] },
                },
                totalPickUpreq: {
                    $sum: { $cond: [{ $eq: ["$status", "pickUpreq"] }, 1, 0] },
                },
                totalOngoing: {
                    $sum: { $cond: [{ $eq: ["$status", "Ongoing"] }, 1, 0] },
                },
                totalDropOffReq: {
                    $sum: { $cond: [{ $eq: ["$status", "dropOffReq"] }, 1, 0] },
                },
                totalCompleted: {
                    $sum: { $cond: [{ $eq: ["$status", "Completed"] }, 1, 0] },
                },
                totalCancelled: {
                    $sum: { $cond: [{ $eq: ["$status", "Cancelled"] }, 1, 0] },
                },
            },
        },
        {
            $project: {
                _id: 0,
                totalAmountCompleted: 1,
                totalOrders: 1,
                totalUsers: { $size: "$totalUsers" },
                totalCancelled: 1,
                totalOngoing: 1,
                totalPickup: 1,
                totalDropOffReq: 1,
                totalPickUpreq: 1,
                totalCompleted: 1,
            },
        },
    ]);
    const resultArray = [];
    if (data.length > 0) {
        const firstResult = data[0];
        for (const key in firstResult) {
            if (typeof firstResult[key] === "number" &&
                key != "totalAmountCompleted" &&
                key != "totalOrders" &&
                key != "totalUsers") {
                resultArray.push(firstResult[key]);
            }
        }
    }
    res.status(200).json({
        message: "dashboard Details Vendor",
        dashboardDetails: { data, resultArray },
    });
});
exports.profileData = (0, express_async_handler_1.default)(async (req, res) => {
    const hubId = req.query.hubId;
    const hub = await hubSchema_1.default.findById(hubId);
    res.status(200).json({ hub });
});
exports.profileDataUpdate = (0, express_async_handler_1.default)(async (req, res) => {
    const { license, imageMain, imageSub, validityDate, hubId } = req.body;
    const hub = await hubSchema_1.default.findById(hubId);
    const imagesUploadPromises = [];
    const imagesRemovePromises = [];
    if (imageMain) {
        imagesUploadPromises.push(cloudinary_1.default.uploader.upload(imageMain, {
            folder: "hub",
            public_id: `${hub.hubName + "imageMain"}`,
        }));
        imagesRemovePromises.push(cloudinary_1.default.api.delete_resources([`hub/${hub.hubName + "imageMain"}`], {
            type: "upload",
            resource_type: "image",
        }));
    }
    if (imageSub) {
        imagesUploadPromises.push(cloudinary_1.default.uploader.upload(imageSub, {
            folder: "hub",
            public_id: `${hub.hubName + "imageSub"}`,
        }));
        imagesRemovePromises.push(cloudinary_1.default.api.delete_resources([`hub/${hub.hubName + "imageSub"}`], {
            type: "upload",
            resource_type: "image",
        }));
    }
    if (license) {
        imagesUploadPromises.push(cloudinary_1.default.uploader.upload(license, {
            folder: "hubdoc",
            public_id: `${hub.hubName + "license"}`,
        }));
        imagesRemovePromises.push(cloudinary_1.default.api.delete_resources([`hubdoc/${hub.hubName + "license"}`], {
            type: "upload",
            resource_type: "image",
        }));
    }
    const remove = await Promise.all(imagesRemovePromises);
    const images = await Promise.all(imagesUploadPromises);
    images.map((item) => {
        if (item.public_id === `hubdoc/${hub.hubName + "license"}`) {
            hub.license = item.url;
        }
        if (item.public_id === `hub/${hub.hubName + "imageSub"}`) {
            hub.hubMultiImage = [item.url];
        }
        if (item.public_id === `hub/${hub.hubName + "imageMain"}`) {
            hub.hubImage = item.url;
        }
    });
    if (validityDate) {
        hub.validityDate = new Date(validityDate);
    }
    await hub.save();
    res.status(200).json({ message: "updated" });
});
//# sourceMappingURL=hubController.js.map