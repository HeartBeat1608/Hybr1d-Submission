import { Router } from "express";
import {
  deleteProfile,
  getProfile,
  updatePassword,
} from "../controllers/user.controller";
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

router.get("/profile", async (req, res, next) => {
  try {
    const userid = req.user?._id || "";
    const response = await getProfile(userid);
    res.status(STATUS_CODES.SUCCESS).json({
      message: "Profile Loaded Successfully",
      code: API_RESPONSE.OK,
      data: response,
    });
  } catch (err) {
    next(err);
  }
});

router.patch("/password", async (req, res, next) => {
  try {
    const userid = req.user?._id || "";
    const response = await updatePassword(
      userid,
      req.body.current_pass,
      req.body.new_password
    );
    res.status(STATUS_CODES.SUCCESS).json({
      message: "Password Changed Successfully",
      code: API_RESPONSE.OK,
      data: response,
    });
  } catch (err) {
    next(err);
  }
});

export default router;
