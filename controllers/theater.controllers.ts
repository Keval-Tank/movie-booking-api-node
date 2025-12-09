import services from "../services";
import {type Request, type Response} from 'express'
import responses from '../utils/common'
import { StatusCodes } from "http-status-codes";
import type { CreateTheaterRequest } from "../utils/types";

const createTheater = async(req : Request, res : Response) => {
    try{
        const data : CreateTheaterRequest = {
            name : req.body.name,
            description : req.body.description,
            city : req.body.city,
            pincode : parseInt(req.body.pincode),
            address : req.body.address
        }
        const result = await services.TheaterService.createTheater(data)
        responses.SuccessResponse.data = result;
        responses.SuccessResponse.message = "Theater created"
        return res.status(StatusCodes.CREATED).json(responses.SuccessResponse);
    }catch(err : any){
        responses.ErrorResponse.error = err;
        responses.ErrorResponse.message = err.message || "Failed to create theater"
        return res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(responses.ErrorResponse)
    }
}

const getTheater = async(req : Request, res : Response) => {
    try{
        const result = await services.TheaterService.getTheater(req.params.id!);
        responses.SuccessResponse.data = result;
        responses.SuccessResponse.message = "Requested Theaters"
        return res.status(StatusCodes.OK).json(responses.SuccessResponse)
    }catch(err : any){
        responses.ErrorResponse.error = err;
        responses.ErrorResponse.message = err.message || "Failed to create theater"
        return res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(responses.ErrorResponse)
    }
}

const getAllTheaters = async(req : Request, res : Response) => {
    try{
        const result = await services.TheaterService.getAllTheaters();
        responses.SuccessResponse.data = result;
        responses.SuccessResponse.message = "Theaters fetched successfully"
        return res.status(StatusCodes.OK).json(responses.SuccessResponse)
    }catch(err : any){
        responses.ErrorResponse.error = err;
        responses.ErrorResponse.message = err.message || "Failed to create theater"
        return res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(responses.ErrorResponse)
    }
}

const deleteTheaters = async(req : Request, res : Response) => {
    try{
        const result = await services.TheaterService.deleteTheater(req.params.id!);
        responses.SuccessResponse.data = result;
        responses.SuccessResponse.message = "Theaters deleted successfully"
        return res.status(StatusCodes.OK).json(responses.SuccessResponse)
    }catch(err : any){
        responses.ErrorResponse.error = err;
        responses.ErrorResponse.message = err.message || "Failed to delete theater"
        return res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(responses.ErrorResponse)
    }
}


export default {
    createTheater,
    getTheater,
    getAllTheaters,
    deleteTheaters
}