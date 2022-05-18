import { Model, Document, model, Schema, SchemaTypes, Types } from "mongoose";
type ObjectId = Types.ObjectId;

export interface MovieHistoryType {
  user: ObjectId;
  movie: ObjectId;
  history: {
    rating: number;
    changedOn: Date;
  }[];
}

export interface MovieHistoryDocument extends Document, MovieHistoryType {}
export interface MovieHistoryModelType extends Model<MovieHistoryDocument> {}

const movieHistorySchema: Schema<MovieHistoryDocument, MovieHistoryModelType> =
  new Schema(
    {
      user: {
        type: SchemaTypes.ObjectId,
        ref: "User",
        required: true,
      },
      movie: {
        type: SchemaTypes.ObjectId,
        ref: "Movie",
        required: true,
      },
      history: [
        {
          rating: { type: SchemaTypes.Number, default: 0 },
          changedOn: { type: SchemaTypes.Date, default: new Date() },
        },
      ],
    },
    { timestamps: true }
  );

export const MovieHistoryModel = model<
  MovieHistoryDocument,
  MovieHistoryModelType
>("MovieHistory", movieHistorySchema);
