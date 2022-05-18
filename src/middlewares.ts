import { NextFunction, Request, Response } from "express";
import { UserRole } from "./models/user.model";
import { API_RESPONSE, STATUS_CODES } from "./utils/api_response";
import { CustomError, NotFoundError } from "./utils/errors";
import { verifyToken } from "./utils/jwt";

export const NotFoundHandler = (
  _req: Request,
  _res: Response,
  next: NextFunction
) => {
  const error = new NotFoundError();
  // log this error to database here (if required)
  return next(error);
};

export const ErrorHandler = (
  error: Error | CustomError,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  const stack = process.env.NODE_ENV === "production" ? null : error.stack;
  if (error instanceof CustomError) {
    return res.status(error.statusCode).json({
      message: error.message,
      code: API_RESPONSE.FAILED,
      data: null,
      stack,
    });
  }

  return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
    message: error.message,
    code: API_RESPONSE.FAILED,
    data: null,
    stack,
  });
};

export const mustAuthorize = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const header = req.headers.authorization;
    if (!header)
      throw new CustomError(
        "Authorization header missing",
        STATUS_CODES.UNAUTHORIZED
      );

    const token = header.replace(/Bearer /g, "");
    if (!token.trim())
      throw new CustomError("Access Token missing", STATUS_CODES.UNAUTHORIZED);

    const payload = verifyToken(token);
    if (!payload)
      throw new CustomError(
        "Inavlid JWT token provided.",
        STATUS_CODES.UNAUTHORIZED
      );

    // either use the exact type or cast it to 'any' for auto merging of types
    req.user = payload as any;

    next();
  } catch (err) {
    next(err);
  }
};

export const restrictAccess =
  (role: UserRole) => (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user)
        throw new CustomError("Unauthorized", STATUS_CODES.UNAUTHORIZED);
      if (req.user.role !== role)
        throw new CustomError("Access Forbidden", STATUS_CODES.FORBIDDEN);
      next();
    } catch (err) {
      next(err);
    }
  };
