import { Model, Document, model, Schema, SchemaTypes } from "mongoose";

export type UserRole = "buyer" | "seller";

export interface UserType {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface UserDocument extends Document, UserType {}
export interface UserModelType extends Model<UserDocument> {}

const userSchema: Schema<UserDocument, UserModelType> = new Schema(
  {
    name: {
      type: SchemaTypes.String,
      required: true,
      minlength: 10,
    },
    email: {
      type: SchemaTypes.String,
      required: true,
      match: [/(\w+)\@(\w+)\.(\w+)/, "Please enter a valid email address"],
    },
    password: {
      type: SchemaTypes.String,
      required: true,
    },
    role: {
      type: SchemaTypes.String,
      enum: {
        values: ["buyer", "seller"],
        message: "'{VALUE}' is not a valid user role",
      },
      default: "buyer",
    },
  },
  { timestamps: true } // this will add the createdAt and updatedAt keys to the documents automatically.
);

export const UserModel = model<UserDocument, UserModelType>("User", userSchema);
