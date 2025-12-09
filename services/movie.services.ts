import models from '../models'
import { type CreateMovieRequest } from '../utils/types'
import AppError from '../utils/errors';
import { StatusCodes } from 'http-status-codes';

// create a movie
async function createMovieService(data : CreateMovieRequest) { 
    try{
        const movie = await models.MovieSchema.create(data as any);
        return movie;
    }catch(err : any){
        if(err.name === 'ValidationError'){
            const errors = Object.values(err.errors).map(e => e.message!);
            throw {explanation : errors, statusCode : StatusCodes.NOT_ACCEPTABLE}
        }
        throw new AppError("Unable to create a movie", StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

// get a movie by id
async function getMovie(id : string) {
    try {
        const movie = await models.MovieSchema.findById(id);
        if(!movie){
            throw new AppError("movie with this id was not found", StatusCodes.NOT_FOUND)
        }
        return movie;
    }catch(err : any){
        throw new AppError(err.message, err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

// delete a movie
async function deleteMovie(id : string){
    try{
        const result = await models.MovieSchema.deleteOne({
            _id : id
        })
        if(result.deletedCount === 0){
            throw new AppError("Requested data to delete is found", StatusCodes.NOT_FOUND)
        }
        return result;
    }catch(err : any){
        throw new AppError(err.message, err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

// update a movie
async function updateMovie(id : string, data : any){
    try {
        const result = await models.MovieSchema.findOneAndUpdate({
                _id : id            
        }, data, {
            runValidators : true,
            returnOriginal : false
        })
        return result
    } catch (err : any) {
        if(err.name === 'ValidationError'){
            const errors = Object.values(err.errors).map(e => e.message!);
            throw {explanation : errors, statusCode : StatusCodes.NOT_ACCEPTABLE, message : "Requested updates violate validation constraints"}
        }
        throw new AppError("Unable to create a movie", StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

// fetch movie according to query
async function fetchMovies(data : any){
   try {
        if(Object.keys(data).length === 0){
            const allMovies = await models.MovieSchema.find();
            return allMovies;
        }else{
            const query = {};
            Object.entries(data).map(e => {
                if(e[0] === 'name' || e[0] === 'director'  || e[0] === 'language' || e[0] === 'releaseStatus'){
                    query[e[0]] = {
                        $regex : '.*' + e[1] + '.*'
                    }
                }
                if(e[0] === 'releaseDate'){
                    query[e[0]] = e[1]
                }
            })
            console.log(query)
            const requestedMovie = await models.MovieSchema.find(query);
            if(requestedMovie.length === 0){
                throw new AppError("Requested movie not Found", StatusCodes.NOT_FOUND)
            }
            return requestedMovie
        }
   } catch (err : any) {
    console.log(err)
    throw new AppError(err.message , err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
   }
}

export default {
    createMovieService,
    getMovie,
    deleteMovie,
    updateMovie,
    fetchMovies
}