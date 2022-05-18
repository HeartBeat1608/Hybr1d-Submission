import { Router } from "express";
import { API_RESPONSE, STATUS_CODES } from "./utils/api_response";

import authRouter from "./routes/auth.routes";
import userRouter from "./routes/user.routes";
import movieRouter from "./routes/movie.routes";
import { mustAuthorize } from "./middlewares";

const router = Router();

router.all("/", async (_req, res, next) => {
  res
    .status(STATUS_CODES.SUCCESS)
    .json({ message: "API Working", code: API_RESPONSE.OK });
});

router.use("/auth", authRouter);
router.use("/user", mustAuthorize, userRouter);
router.use("/movie", mustAuthorize, movieRouter);

export default router;
