import { Request, Response, NextFunction } from "express";
import multer, { MulterError } from "multer";
import path from "path";

const storage = multer.diskStorage({
  filename: (
    _req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    cb(null, `${uniqueSuffix}${fileExtension}`);
  },

  destination: (
    _req: Request,
    _file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) => {
    cb(null, "public/uploads/user-images");
  },
});

const upload = multer({
  storage,
});

function storageImage(req: Request, res: Response, next: NextFunction) {
  upload.single("image")(req, res, (err: any) => {
    if (err instanceof MulterError) {
      return res
        .status(400)
        .json({ success: false, error: "Multer error occurred." });
    } else if (err) {
      console.log(err)
      return res
        .status(500)
        .json({ success: false, error: "Unknown error occurred." });
    }

    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, error: "No file uploaded." });
    }

    (req as any).imageName = req.file.filename;
    next();
  });
}

export { storageImage };
