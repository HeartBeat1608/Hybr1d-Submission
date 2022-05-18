import { Router } from "express";
import { createCatalog, getOrderList } from "../controllers/seller.controller";
import { API_RESPONSE, STATUS_CODES } from "../utils/api_response";

const router = Router();

router.post("/create-catalog", async (req, res, next) => {
  try {
    const userid = req.user?._id || "";
    const response = await createCatalog(userid, {
      items: req.body.items,
    });
    res.status(STATUS_CODES.CREATED).json({
      message: "Catalog created successfully",
      code: API_RESPONSE.CREATED,
      data: response,
    });
  } catch (err) {
    next(err);
  }
});

router.get("/orders", async (req, res, next) => {
  try {
    const seller = req.user?._id || "";
    const response = await getOrderList(seller);
    res.status(STATUS_CODES.SUCCESS).json({
      message: "Order list loaded successfully",
      code: API_RESPONSE.OK,
      data: response,
    });
  } catch (err) {
    next(err);
  }
});

export default router;
