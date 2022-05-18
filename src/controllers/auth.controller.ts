import { UserModel, UserRole } from "../models/user.model";
import { CustomError, NotFoundError } from "../utils/errors";
import { generateToken } from "../utils/jwt";
import { validateRequired } from "../utils/validate";
import { createUser } from "./user.controller";

interface LoginDto {
  email: string;
  password: string;
  role: UserRole;
}
export const login = async (dto: LoginDto) => {
  validateRequired(dto);

  const user = await UserModel.findOne({
    email: dto.email,
    role: dto.role,
  }).orFail(new NotFoundError(`Email not registered as ${dto.role} yet.`));

  if (user.password !== dto.password)
    throw new CustomError("Password Mismatch");

  const token = generateToken({
    email: user.email,
    _id: user._id,
    name: user.name,
    role: user.role,
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
    role: user.role,
  });

  return { user, token };
};
