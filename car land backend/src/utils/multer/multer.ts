import multer, { FileFilterCallback } from "multer";
import { Request, Response, NextFunction } from "express";
import AsyncHandler from "express-async-handler";
const storage = multer.memoryStorage();
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
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (!["image/png", "image/jpg", "image/jpeg"].includes(file?.mimetype)) {
    return cb(new Error("Not an image"));
  }
  return cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5242880 },
});

export const parseImages = AsyncHandler(
  (req: Request, res: Response, next: NextFunction) => {
    upload.array("images")(req, res, (err: any) => {
      if (err) {
        if (err.message === "Not an image") {
          return next(new Error("Not an image"));
        }
        if (err.message === "File too large") {
          return next(new Error("File too large"));
        }
        upload.single("images")(req, res, (err: any) => {
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
      } else {
        return next();
      }
    });
  }
);
