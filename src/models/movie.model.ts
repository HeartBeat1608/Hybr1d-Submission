import { Model, Document, model, Schema, SchemaTypes, Types } from "mongoose";
type ObjectId = Types.ObjectId;

export interface MovieType {
  name: string;
  description?: string;
  ratings: {
    user: ObjectId;
    rating: number;
  }[];
  averageRating: number;
}

export interface MovieDocument extends Document, MovieType {}
export interface MovieModelType extends Model<MovieDocument> {}

const movieSchema: Schema<MovieDocument, MovieModelType> = new Schema(
  {
    name: {
      type: SchemaTypes.String,
      required: true,
    },
    description: SchemaTypes.String,
    ratings: [
      {
        user: {
          type: SchemaTypes.ObjectId,
          ref: "User",
        },
        rating: {
          type: SchemaTypes.Number,
          default: 0,
        },
      },
    ],
    averageRating: {
      type: SchemaTypes.Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const MovieModel = model<MovieDocument, MovieModelType>(
  "Movie",
  movieSchema
);
