import { Model, Document, model, Schema, SchemaTypes, Types } from "mongoose";

type ObjectId = Types.ObjectId;

export interface OrderType {
  seller: ObjectId;
  buyer: ObjectId;
  products: ObjectId[];
}

export interface OrderDocument extends Document, OrderType {}
export interface OrderModelType extends Model<OrderDocument> {}

const orderSchema: Schema<OrderDocument, OrderModelType> = new Schema(
  {
    seller: {
      type: SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    buyer: {
      type: SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    products: [{ type: SchemaTypes.ObjectId, ref: "Product" }],
  },
  { timestamps: true }
);

export const OrderModel = model<OrderDocument, OrderModelType>(
  "Order",
  orderSchema
);
