import { Model, Document, model, Schema, SchemaTypes, Types } from "mongoose";

type ObjectId = Types.ObjectId;

export interface CatalogType {
  seller: ObjectId;
  products: ObjectId[];
}

export interface CatalogDocument extends Document, CatalogType {}
export interface CatalogModelType extends Model<CatalogDocument> {}

const catalogSchema: Schema<CatalogDocument, CatalogModelType> = new Schema(
  {
    seller: {
      type: SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        type: SchemaTypes.ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true }
);

export const CatalogModel = model<CatalogDocument, CatalogModelType>(
  "Catalog",
  catalogSchema
);
