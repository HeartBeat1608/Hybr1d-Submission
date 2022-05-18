import { Router } from "express";
import {
  addMovie,
  addMovieRating,
  findMovie,
  getChangeHistory,
} from "../controllers/movie.controller";
import { API_RESPONSE, STATUS_CODES } from "../utils/api_response";

const router = Router();

router.get("/find", async (req, res, next) => {
  try {
    const response = await findMovie(req.query.s?.toString());
    res.status(STATUS_CODES.SUCCESS).json({
      message: `Found ${response.length} movies`,
      code: API_RESPONSE.OK,
      data: response,
    });
  } catch (err) {
    next(err);
  }
});

router.get("/history", async (req, res, next) => {
  try {
    const userid = req.user?._id || "";
    const response = await getChangeHistory(
      userid,
      req.query.q?.toString() || ""
    );
    res.status(STATUS_CODES.SUCCESS).json({
      message: "History loaded successfully",
      code: API_RESPONSE.OK,
      data: response,
    });
  } catch (err) {
    next(err);
  }
});

router.post("/rate", async (req, res, next) => {
  try {
    const userid = req.user?._id || "";
    const response = await addMovieRating(userid, {
      movie: req.body.movie,
      rating: req.body.rating,
    });
    res.status(STATUS_CODES.SUCCESS).json({
      message: "Rating added successfully",
      code: API_RESPONSE.OK,
      data: response,
    });
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const userid = req.user?._id || "";
    const response = await addMovie(userid, {
      name: req.body.name,
      rating: req.body.rating,
      description: req.body.description,
    });
    res.status(STATUS_CODES.SUCCESS).json({
      message: "Movie Added Successfully",
      code: API_RESPONSE.OK,
      data: response,
    });
  } catch (err) {
    next(err);
  }
});
export default router;
