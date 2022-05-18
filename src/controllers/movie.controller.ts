import { MovieModel } from "../models/movie.model";
import { validateRequired } from "../utils/validate";

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

export const findMovie = async (name: string) => {
  validateRequired({ name });

  const movies = await MovieModel.find({
    name: new RegExp(name, "ig"),
  });

  return movies;
};
