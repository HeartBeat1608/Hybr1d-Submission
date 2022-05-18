import { MovieModel } from "../models/movie.model";
import { MovieHistoryModel } from "../models/moviehistory.model";
import { STATUS_CODES } from "../utils/api_response";
import { CustomError } from "../utils/errors";
import { validateRequired } from "../utils/validate";
import { changeMovieRating } from "./movie-history.controller";

interface AddMovieDTO {
  name: string;
  description?: string;
  rating: number;
}
export const addMovie = async (user: string, dto: AddMovieDTO) => {
  validateRequired(dto);

  // add the movie with the current user rating as both average and listed
  const movie = await new MovieModel({
    name: dto.name,
    description: dto.description,
    ratings: [
      {
        user,
        rating: dto.rating,
      },
    ],
    averageRating: dto.rating,
  }).save();

  return movie;
};

export const findMovie = async (name?: string) => {
  name ||= "";
  const movies = await MovieModel.find({
    name: new RegExp(name, "ig"),
  }).select("-ratings");

  return movies;
};

interface AddRatingDTO {
  movie: string;
  rating: number;
}
export const addMovieRating = async (user: string, dto: AddRatingDTO) => {
  validateRequired(dto);

  const updatedMovie = await changeMovieRating(user, dto);
  return updatedMovie;
};

export const getChangeHistory = async (user: string, movie: string) => {
  validateRequired({ user, movie });

  const history = await MovieHistoryModel.findOne({
    user,
    movie,
  }).orFail(
    new CustomError("No History found for that movie", STATUS_CODES.NOT_FOUND)
  );

  return history;
};
