export interface CreateMovieRequest {
    name : String
    description : String
    casts : String
    trailerUrl : String
    language :String
    releaseDate :String
    director : String
    releaseStatus : String
}

export interface CommonResponse {
    success : boolean,
    data : any,
    error : any,
    message : String
}
