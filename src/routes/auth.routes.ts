import { Router } from "express";
import { login, register } from "../controllers/auth.controller";
import { API_RESPONSE, STATUS_CODES } from "../utils/api_response";

const router = Router();

router.post("/login", async (req, res, next) => {
  try {
    const response = await login({
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
    });
    res.status(STATUS_CODES.SUCCESS).json({
      message: "Login Successful",
      code: API_RESPONSE.OK,
      data: response,
    });
  } catch (err) {
    next(err);
  }
});

router.post("/register", async (req, res, next) => {
  try {
    const response = await register({
      email: req.body.email,
      name: req.body.name,
      password: req.body.password,
      role: req.body.role,
    });
    res.status(STATUS_CODES.SUCCESS).json({
      message: "Registration Successful",
      code: API_RESPONSE.OK,
      data: response,
    });
  } catch (err) {
    next(err);
  }
});

export default router;
