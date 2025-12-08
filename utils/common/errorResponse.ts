import { type CommonResponse } from "../types"

const ErrorResponse : CommonResponse = {
    success : false,
    message : "Something went wrong!",
    data : {},
    error : {},
}

export default {
    ErrorResponse
}