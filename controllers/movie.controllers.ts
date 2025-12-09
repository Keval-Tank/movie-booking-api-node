import { type Request, type Response } from "express"
import services from "../services"
import responses from '../utils/common'
import { StatusCodes } from "http-status-codes"

const createMovie = async(req : Request, res : Response) => {
    try{
        const movie_data = {
            name : req.body.name,
            description : req.body.description,
            casts : req.body.casts.split(','),
            trailerUrl : req.body.trailerUrl,
            language : req.body.language,
            releaseDate : req.body.releaseDate,
            director :req.body.director,
            releaseStatus : req.body.releaseStatus
        }
        const result = await services.MovieService.createMovieService(movie_data);
        responses.SuccessResponse.data = result;
        responses.SuccessResponse.message = "Movie created!"
        return res.status(StatusCodes.CREATED).json(responses.SuccessResponse)
    }catch(err : any){
        responses.ErrorResponse.error = err;
        responses.ErrorResponse.message = "Unable to create a movie"
        return res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(responses.ErrorResponse)
    }
}

const getMovie = async(req : Request, res : Response) => {
    try {
        const result = await services.MovieService.getMovie(req.params.id!);
        responses.SuccessResponse.data = result;
        responses.SuccessResponse.message = "Requested Movie"
        return res.status(StatusCodes.OK).json(responses.SuccessResponse)
    } catch (err : any) {
        responses.ErrorResponse.error = err;
        responses.ErrorResponse.message = err.message || "Unable to get a movie" 
        return res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(responses.ErrorResponse)
    }
}

const deleteMovie = async(req : Request, res : Response) => {
    try{
        const result = await services.MovieService.deleteMovie(req.params.id!);
        responses.SuccessResponse.data = result;
        responses.SuccessResponse.message = "Deleted movie"
        return res.status(StatusCodes.OK).json(responses.SuccessResponse)
    }catch(err : any){
        responses.ErrorResponse.error = err;
        responses.ErrorResponse.message = err.message || "Unable to delete a movie" 
        return res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(responses.ErrorResponse)
    }
}

const updateMovie = async(req : Request, res : Response) => {
    try{
        const result = await services.MovieService.updateMovie(req.params.id!, req.body);
        responses.SuccessResponse.data = result
        responses.SuccessResponse.message = "Upadted data"
        return res.status(StatusCodes.OK).json(responses.SuccessResponse)
    }catch(err : any){
        responses.ErrorResponse.error = err;
        responses.ErrorResponse.message = err.message || "Unable to update a movie" 
        return res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(responses.ErrorResponse)
    }
}

const fetchMovies = async(req : Request, res : Response) => {
    try{
        const result = await services.MovieService.fetchMovies(req.query);
        responses.SuccessResponse.data = result;
        responses.SuccessResponse.message = "Requested Movie"
        return res.status(StatusCodes.OK).json(responses.SuccessResponse) 
    }catch(err : any){
        responses.ErrorResponse.error = err;
        responses.ErrorResponse.message = err.message || "Unable to fetch a movie" 
        return res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(responses.ErrorResponse)
    }
}




export default {
    createMovie,
    getMovie,
    deleteMovie,
    updateMovie,
    fetchMovies
}