import models from '../models'
import { type CreateMovieRequest } from '../utils/types'

async function createMovieService(data : Partial<CreateMovieRequest>) { 
    try{
        const movie = await models.MovieSchema.create(data);
    }catch(err){

    }
}