import JWT from "jsonwebtoken";
import { CustomError } from "./errors";

const JWT_SECRET = process.env.JWT || "6K5ahrS4yty8jpXp";

/**
 * Generate the JWT for the provided payload (expires in 1 Day)
 * @param payload Payload for the token
 */
export const generateToken = (payload: any) => {
  const token = JWT.sign(payload, JWT_SECRET, {
    algorithm: "ES512",
    issuer: "ZeroBalance",
    expiresIn: "1d",
  });

  return token;
};

/**
 * Verify and decode the payload from the token
 * @param token Token to be verified
 * @returns Payload from the decoded token, if verified successfully
 * @throws {CustomError} Error stating the reason for failure
 */
export const verifyToken = (token: string) => {
  const decoded = JWT.verify(token, JWT_SECRET, {
    issuer: "ZeroBalance",
    algorithms: ["ES512"],
  });

  if (typeof decoded === "string")
    throw new CustomError("Invalid token specified");
  return decoded;
};

/**
 * Decode the token without verifying the signature.
 * `UNSAFE` - This method should be avoided whenever possible.
 * @param token
 * @returns
 */
export const decodeToken = (token: string) => {
  return JWT.decode(token);
};
