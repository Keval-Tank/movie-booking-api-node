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
async function getAllTheaters(data : any){
    try{
        const query : any = {}
        const pagination : any = {}
        if(data && data.city){
            query.city = data.city
        }
        if(data && data.pincode){
            query.pincode = data.pincode
        }
        if(data && data.name){
            query.name = data.name
        }
        if(data && data.limit){
            pagination.limit = data.limit
        }
        if(data && data.skip){
            let perPage = (data.limit) ? data.limit : 1;
            pagination.skip = data.skip * perPage
        }
        const result = await models.Theater.find(query , {}, pagination)
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

// update movies in a theater
async function updateMoviesInATheater(theaterId : string, movieIds : [string], insert : boolean) {
    const theater = await models.Theater.findById(theaterId);
    if(!theater){
        throw new AppError("Failed to find theater with id", StatusCodes.NOT_FOUND);
    }
    if(insert){
        movieIds.forEach(movieId => {
           if(!theater.movies.find((id) => id == movieId)){
             theater.movies.push(movieId);
           }
        })
    }else{
        let theater_movies = theater.movies;
        movieIds.forEach(movieId => {
            theater_movies = theater_movies.filter( id => id != movieId)
        });
        theater.movies = theater_movies;
    }
    await theater.save();
    return theater.populate('movies')
}


// update a theater
async function updateTheater(id : string, data : Partial<CreateTheaterRequest>){
   try{
     const result = await models.Theater.findByIdAndUpdate(id, data, {new : true, runValidators : true});
     return result
   }catch(err : any){
     if(err.name === "ValidationError"){
        const errs = []
        Object.values(err.errors).map(e => errs.push(e.properties.message))
        throw {explanation : errs, statusCode : StatusCodes.BAD_REQUEST}
     }
     throw new AppError(err.message || "Failed to update theater", err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)  
   }
}



export default {
    createTheater,
    getTheater,
    getAllTheaters,
    deleteTheater,
    updateMoviesInATheater,
    updateTheater
}