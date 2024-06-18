import { NextFunction, Request, Response } from "express";
import { get } from "lodash";
import { verifyJwt } from "../utils/jwt.utils";

const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = get(req, "headers.authorization", "").replace(/^Bearer\s/, "");

  if (!accessToken) {
    return res
      .status(403)
      .json({ success: false, message: "Unauthorized User!" });
  }

  const { decoded, isValid, isExpired } = await verifyJwt(accessToken);

  if (!isValid || isExpired) {
    return res
      .status(403)
      .json({ success: false, message: "Unauthorized User!" });
  }

  res.locals.user = decoded;
  return next();
};

export default deserializeUser;
