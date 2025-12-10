import {type Request, type Response, type NextFunction} from 'express'
import responses from '../utils/common'
import { StatusCodes } from 'http-status-codes'

export const validateCreateTheaterRequest = (req : Request, res : Response, next : NextFunction) => {
    if(!req.body.name){
        responses.ErrorResponse.error = {explanation : "Name of theater is not provided"}
        responses.ErrorResponse.message = "Theater Name flied not provided"
        return res.status(StatusCodes.BAD_REQUEST).json(responses.ErrorResponse)
    }
    if(!req.body.city){
        responses.ErrorResponse.error = {explanation : "City of theater is not provided"}
        responses.ErrorResponse.message = "Theater city flied not provided"
        return res.status(StatusCodes.BAD_REQUEST).json(responses.ErrorResponse)
    }
    if(!req.body.pincode){
        responses.ErrorResponse.error = {explanation : "Pincode of theater is not provided"}
        responses.ErrorResponse.message = "Theater pincode flied not provided"
        return res.status(StatusCodes.BAD_REQUEST).json(responses.ErrorResponse)
    }
    next();
}

export const validateUpdateMovieRequest = (req : Request, res : Response, next : NextFunction) => {
    if(!req.body.movieIds){
        responses.ErrorResponse.error = {explanation : "movie ids property is not provided"}
        responses.ErrorResponse.message = "movie ids field not provided"
        return res.status(StatusCodes.BAD_REQUEST).json(responses.ErrorResponse)
    }
    next()
}