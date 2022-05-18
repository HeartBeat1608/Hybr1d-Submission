import { Model, Document, model, Schema, SchemaTypes } from "mongoose";

export interface UserType {
  name: string;
  email: string;
  password: string;
  attempts: number;
  last_attempt: Date;
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
      match: [/[a-zA-Z0-9\@\$\!]/, "Please enter a valid password"],
    },
    attempts: {
      type: SchemaTypes.Number,
      default: 0,
      min: 0,
      max: 4,
    },
    last_attempt: {
      type: SchemaTypes.Date,
      default: new Date(),
    },
  },
  { timestamps: true } // this will add the createdAt and updatedAt keys to the documents automatically.
);

export const UserModel = model<UserDocument, UserModelType>("User", userSchema);
