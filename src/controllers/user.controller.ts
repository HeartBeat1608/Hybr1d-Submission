import { UserModel, UserRole } from "../models/user.model";
import { STATUS_CODES } from "../utils/api_response";
import { CustomError, NotFoundError, RequiredError } from "../utils/errors";
import { validateRequired } from "../utils/validate";

interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}
export const createUser = async (dto: CreateUserDTO) => {
  validateRequired(dto);

  // this try catch is how I handle existence.
  // this allows me to throw an error is the lookup fails and I can perform other things in the catch block
  // this also allows me to not store the result anywhere, hence saving a bit of memory and computation (not much but one variable less to debug).
  try {
    await UserModel.findOne({ email: dto.email }).orFail(new Error());
  } catch {
    const newUser = await new UserModel(dto).save();
    const res = newUser.toJSON();
    delete res["password"];
    return res;
  }

  throw new CustomError(
    "Email ID already registered",
    STATUS_CODES.BAD_REQUEST
  );
};

export const getProfile = async (id: string) => {
  if (!id) throw new RequiredError("id");

  const user = await UserModel.findById(id)
    .select("-password")
    .orFail(new NotFoundError("No user found"));
  return user;
};

export const updatePassword = async (
  id: string,
  current_pass: string,
  new_password: string
) => {
  validateRequired({
    id,
    current_pass,
    new_password,
  });

  const user = await UserModel.findOneAndUpdate(
    { password: current_pass, _id: id },
    { $set: { password: new_password } },
    { new: true }
  ).orFail(new CustomError("Password update failed"));

  return user;
};

export const deleteProfile = async (id: string, password: string) => {
  validateRequired({ id, password });

  await UserModel.findOneAndDelete({ _id: id, password }).orFail(
    new CustomError("Invalid Password or No such user")
  );

  return null;
};
