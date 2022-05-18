import { CatalogModel } from "../models/catalog.model";
import { OrderModel } from "../models/order.model";
import { ProductModel } from "../models/product.model";
import { validateRequired } from "../utils/validate";

interface CreateCatalogDTO {
  items: {
    name: string;
    price: number;
  }[];
}
export const createCatalog = async (userid: string, dto: CreateCatalogDTO) => {
  validateRequired(dto);

  const productBulkWrite = await ProductModel.bulkWrite(
    dto.items.map((itm) => ({
      insertOne: {
        document: itm,
      },
    }))
  );

  const catalog = await new CatalogModel({
    seller: userid,
    products: Object.values(productBulkWrite.insertedIds),
  }).save();

  return catalog;
};

export const getOrderList = async (seller: string) => {
  return await OrderModel.find({ seller })
    .select("-seller")
    .populate("buyer", "name email")
    .populate("products", "name price");
};
