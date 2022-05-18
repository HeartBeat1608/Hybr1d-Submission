import { UserModel } from "../models/user.model";
import { CatalogModel } from "../models/catalog.model";
import { OrderModel } from "../models/order.model";
import { validateRequired } from "../utils/validate";
import { CustomError } from "../utils/errors";
import { STATUS_CODES } from "../utils/api_response";

export const getListOfSellers = async () => {
  return await UserModel.find({ role: "seller" }).select("-password -role");
};

export const getCatalogOfSeller = async (seller: string) => {
  validateRequired({ seller });

  const catalog = await CatalogModel.findOne({ seller })
    .populate("products")
    .orFail(
      new CustomError(
        "No Catalog found for that seller",
        STATUS_CODES.NOT_FOUND
      )
    );
  return catalog;
};

interface CreateOrderDTO {
  seller: string;
  items: string[];
}
export const createOrder = async (user: string, dto: CreateOrderDTO) => {
  validateRequired(dto);

  const order = await new OrderModel({
    buyer: user,
    seller: dto.seller,
    products: dto.items,
  }).save();

  return order;
};
