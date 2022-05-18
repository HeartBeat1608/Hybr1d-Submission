import { Model, Document, model, Schema, SchemaTypes } from "mongoose";

export interface ProductType {
  name: string;
  price: number;
}

export interface ProductDocument extends Document, ProductType {}
export interface ProductModelType extends Model<ProductDocument> {}

const productSchema: Schema<ProductDocument, ProductModelType> = new Schema(
  {
    name: {
      type: SchemaTypes.String,
      required: true,
    },
    price: {
      type: SchemaTypes.Number,
      required: true,
      min: 0, // enforcing this will ensure all positive values (why give a negative price ?)
    },
  },
  { timestamps: true }
);

export const ProductModel = model<ProductDocument, ProductModelType>(
  "Product",
  productSchema
);
