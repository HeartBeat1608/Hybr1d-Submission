import { Router } from "express";
import { API_RESPONSE, STATUS_CODES } from "./utils/api_response";

import authRouter from "./routes/auth.routes";
import userRouter from "./routes/user.routes";
import sellerRouter from "./routes/seller.routes";
import buyerRouter from "./routes/buyer.routes";
import { mustAuthorize, restrictAccess } from "./middlewares";

const router = Router();

router.all("/", async (_req, res, next) => {
  res
    .status(STATUS_CODES.SUCCESS)
    .json({ message: "API Working", code: API_RESPONSE.OK });
});

router.use("/auth", authRouter);
router.use("/user", mustAuthorize, userRouter);
router.use("/seller", mustAuthorize, restrictAccess("seller"), sellerRouter);
router.use("/buyer", mustAuthorize, restrictAccess("buyer"), buyerRouter);

export default router;
