import { UserModel } from "../models/user.model";
import { CustomError, NotFoundError } from "../utils/errors";
import { generateToken } from "../utils/jwt";
import {
  addHalfHour,
  isWithinHalfHour,
  validateRequired,
} from "../utils/validate";
import { createUser } from "./user.controller";

interface LoginDto {
  email: string;
  password: string;
}
export const login = async (dto: LoginDto) => {
  validateRequired(dto);

  const user = await UserModel.findOne({ email: dto.email }).orFail(
    new NotFoundError("Invalid Email")
  );

  if (user.attempts == 4 && isWithinHalfHour(user.last_attempt)) {
    const nextAttempt = addHalfHour(user.last_attempt);
    throw new CustomError(
      `Your account has been frozen, please come back at ${nextAttempt.toLocaleString(
        "en-IN",
        { dateStyle: "long", timeStyle: "long", hour12: false }
      )}`
    );
  } else if (user.attempts < 4) {
    if (user.password !== dto.password) {
      user.attempts += 1;
      user.last_attempt = new Date();
      await user.save();
      throw new CustomError("Invalid Password");
    }
  } else {
    user.attempts = 0;
    user.last_attempt = new Date();
  }

  const token = generateToken({
    email: user.email,
    _id: user._id,
    name: user.name,
  });

  return { user, token };
};

interface RegisterDto extends LoginDto {
  name: string;
}
export const register = async (dto: RegisterDto) => {
  validateRequired(dto);

  const user = await createUser(dto);

  const token = generateToken({
    email: user.email,
    name: user.name,
    _id: user._id,
  });

  return { user, token };
};
