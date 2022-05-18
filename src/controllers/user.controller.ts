import { UserModel } from "../models/user.model";
import { CustomError, NotFoundError, RequiredError } from "../utils/errors";
import { validateRequired } from "../utils/validate";

interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
}
export const createUser = async (dto: CreateUserDTO) => {
  validateRequired(dto);

  const newUser = await new UserModel(dto).save();
  return newUser;
};

export const getProfile = async (id: string) => {
  if (!id) throw new RequiredError("id");

  const user = await UserModel.findById(id).orFail(
    new NotFoundError("No user found")
  );
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
  ).orFail(new CustomError("Password update failed due to invalid password"));

  return user;
};

export const deleteProfile = async (id: string, password: string) => {
  validateRequired({ id, password });

  await UserModel.findOneAndDelete({ _id: id, password }).orFail(
    new CustomError("Invalid Password or No such user")
  );

  return null;
};
