import { Request, Response } from "express";
import User from "../../models/User";
interface MulterRequest extends Request {
  imageName?: string;
}
const updateUserImage = async (req: MulterRequest, res: Response) => {
  try {
    const imagePath: string = req.imageName;
    const email = res.locals.user.email;
    await User.updateOne({ email }, { $set: { image: imagePath } });

    res
      .status(200)
      .json({ success: true, message: "User image updated successfully" });
  } catch (error) {
    console.error("Error updating user image:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to update user image" });
  }
};

export default updateUserImage;
