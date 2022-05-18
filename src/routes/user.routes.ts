import { Router } from "express";
import { deleteProfile } from "../controllers/user.controller";
import { API_RESPONSE, STATUS_CODES } from "../utils/api_response";

const router = Router();

router.delete("/", async (req, res, next) => {
  try {
    await deleteProfile(req.body.id, req.body.password);
    res.status(STATUS_CODES.SUCCESS).json({
      message: "Profile Deleted Successfully",
      code: API_RESPONSE.OK,
      data: null,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
