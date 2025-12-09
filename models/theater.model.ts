import mongoose from "mongoose";
import { Schema } from "mongoose";

const theaterSchema = new Schema({
    name : {
        type : String,
        required : true,
        minLength : 5
    },
    description : String,
    city : {
        type : String,
        required : true
    },
    pincode : {
        type : String,
        required : true
    },
    address : String,
    movies : {
        type : [mongoose.Schema.Types.ObjectId],
        ref : 'Movies'
    }
}, {timestamps : true})

const theater = mongoose.model('Theaters', theaterSchema)
export default theater