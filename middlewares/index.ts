import {validateCreateMovieRequest} from "./movie.middlewares";
import { validateCreateTheaterRequest } from "./theater.middlewares";

export default {
    movieMiddlewares : {validateCreateMovieRequest},
    theaterMiddlewares : {validateCreateTheaterRequest}
}