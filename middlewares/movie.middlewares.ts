import {type Request, type Response, type NextFunction, response} from 'express'
import responses from '../utils/common'
import { StatusCodes } from 'http-status-codes'

export const validateCreateMovieRequest = (req : Request, res : Response, next : NextFunction) => {
    if(!req.body.name){
        responses.ErrorResponse.error = {'msg' : "movie name not found"};
        responses.ErrorResponse.message = "Movie name filed is missing"
        return res.status(StatusCodes.BAD_REQUEST).json(responses.ErrorResponse)
    }
    if(!req.body.description){
        responses.ErrorResponse.error = {'msg' : "movie description not found"};
        responses.ErrorResponse.message = "Movie description filed is missing"
        return res.status(StatusCodes.BAD_REQUEST).json(responses.ErrorResponse)
    }
    if(!req.body.casts){
        responses.ErrorResponse.error = {'msg' : "movie casts not found"};
        responses.ErrorResponse.message = "Movie casts filed is missing"
        return res.status(StatusCodes.BAD_REQUEST).json(responses.ErrorResponse)
    }
    if(!req.body.trailerUrl){
        responses.ErrorResponse.error = {'msg' : "movie trailerUrl not found"};
        responses.ErrorResponse.message = "Movie trailerUrl filed is missing"
        return res.status(StatusCodes.BAD_REQUEST).json(responses.ErrorResponse)
    }
    if(!req.body.language){
        responses.ErrorResponse.error = {'msg' : "movie language not found"};
        responses.ErrorResponse.message = "Movie language filed is missing"
        return res.status(StatusCodes.BAD_REQUEST).json(responses.ErrorResponse)
    }
    if(!req.body.releaseDate){
        responses.ErrorResponse.error = {'msg' : "movie releaseDate not found"};
        responses.ErrorResponse.message = "Movie releaseDate filed is missing"
        return res.status(StatusCodes.BAD_REQUEST).json(responses.ErrorResponse)
    }
    if(!req.body.director){
        responses.ErrorResponse.error = {'msg' : "movie director not found"};
        responses.ErrorResponse.message = "Movie director filed is missing"
        return res.status(StatusCodes.BAD_REQUEST).json(responses.ErrorResponse)
    }
    if(!req.body.releaseStatus){
        responses.ErrorResponse.error = {'msg' : "movie releaseStatus not found"};
        responses.ErrorResponse.message = "Movie releaseStatus filed is missing"
        return res.status(StatusCodes.BAD_REQUEST).json(responses.ErrorResponse)
    }
    next();
}

