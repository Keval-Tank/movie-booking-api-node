import models from '../models'
import { type CreateTheaterRequest } from '../utils/types'
import AppError from '../utils/errors';
import { StatusCodes } from 'http-status-codes';

// create a theater
async function createTheater(data : CreateTheaterRequest){
    try{
        const theater = await models.Theater.create(data as any);
        return theater;
    }catch(err : any){
       if(err.name === "ValidationError"){   
            const errors = []
            Object.values(err.errors).map(e => errors.push(e.properties.message))
            throw new AppError(JSON.stringify(errors), 422)
       }
        throw new AppError("Falied to create Theater", StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

// get a theater
async function getTheater(id : string){
    try{
        const result = await models.Theater.findOne({
            _id : id
        });
        if(result === null){
            throw new AppError("Requested Theater not found", StatusCodes.NOT_FOUND)
        }
        return result
    }catch(err : any){
        throw new AppError(err.message || "Failed to fetch theater", err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

// get all theaters
async function getAllTheaters(){
    try{
        const result = await models.Theater.find()
        return result;
    }catch(err : any){
       throw new AppError(err.message || "Failed to fetch theaters", err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)  
    }
}

// delete theater
async function deleteTheater(id : string){
    try{
        const result = await models.Theater.findByIdAndDelete({
            _id : id
        })
        if(!result){
            throw new AppError("Requested theater to delete was not found", StatusCodes.NOT_FOUND)
        }
        return result
    }catch(err : any){
        throw new AppError(err.message || "Failed to delete theaters", err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)  
    }
}

export default {
    createTheater,
    getTheater,
    getAllTheaters,
    deleteTheater
}