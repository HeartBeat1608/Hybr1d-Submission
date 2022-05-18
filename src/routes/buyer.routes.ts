import { Router } from "express";
import {
  createOrder,
  getCatalogOfSeller,
  getListOfSellers,
} from "../controllers/buyer.controller";
import { API_RESPONSE, STATUS_CODES } from "../utils/api_response";

const router = Router();

router.get("/list-of-sellers", async (_req, res, next) => {
  try {
    const response = await getListOfSellers();
    res.status(STATUS_CODES.SUCCESS).json({
      message: "Seller list loaded",
      code: API_RESPONSE.OK,
      data: response,
    });
  } catch (err) {
    next(err);
  }
});

router.get("/seller-catalog/:seller_id", async (req, res, next) => {
  try {
    const seller_id = req.params.seller_id;
    const response = await getCatalogOfSeller(seller_id);
    res.status(STATUS_CODES.SUCCESS).json({
      message: "Seller Catalog loaded",
      code: API_RESPONSE.OK,
      data: response,
    });
  } catch (err) {
    next(err);
  }
});

router.post("/create-order/:seller_id", async (req, res, next) => {
  try {
    const seller_id = req.params.seller_id;
    const userid = req.user?._id || "";
    const response = await createOrder(userid, {
      seller: seller_id,
      items: req.body.items,
    });
    res.status(STATUS_CODES.CREATED).json({
      message: "Order created successfully",
      code: API_RESPONSE.OK,
      data: response,
    });
  } catch (err) {
    next(err);
  }
});

export default router;
