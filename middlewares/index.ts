import {validateCreateMovieRequest} from "./movie.middlewares";
import { validateCreateTheaterRequest, validateUpdateMovieRequest } from "./theater.middlewares";

export default {
    movieMiddlewares : {validateCreateMovieRequest},
    theaterMiddlewares : {validateCreateTheaterRequest, validateUpdateMovieRequest}
}