import { MovieModel } from "../models/movie.model";
import { MovieHistoryModel } from "../models/moviehistory.model";
import { CustomError, NotFoundError } from "../utils/errors";
import { validateRequired } from "../utils/validate";

interface UpdateMovieDTO {
  movie: string;
  rating: number;
}
export const changeMovieRating = async (user: string, dto: UpdateMovieDTO) => {
  validateRequired(dto);

  // find the movie first
  const movie = await MovieModel.findById(dto.movie).orFail(
    new NotFoundError("No movie found")
  );

  // calculate the new rating using simple maths
  const totalRatings = movie.ratings.length;
  const ratingSum = totalRatings * movie.averageRating;
  let prevRating = 0;
  movie.ratings.forEach((r) => {
    if (r.user.toString() === user) {
      prevRating = r.rating;
      r.rating = dto.rating;
    }
  });

  let newAverage = ratingSum - prevRating + dto.rating;
  newAverage /= totalRatings;

  movie.averageRating = newAverage;

  // add a history record for this update
  await MovieHistoryModel.findOneAndUpdate(
    {
      movie: movie._id,
      user,
    },
    {
      $push: {
        history: {
          rating: dto.rating,
        },
      },
    },
    { upsert: true }
  );

  movie.save();
  return movie;
};
