import {validationResult} from "express-validator";

import {ApiErrors} from "../utils/apiErrors.js";

const validateData = (req, res, next)=> {
 
    const errors = validationResult(req);

    if(errors.isEmpty){
        return next();
    }

    const extractedError = [];

    errors.array().map((err)=> extractedError.push({
        [err.path] : err.msg
    }))

    throw new ApiErrors(422, "Recieved Data is not Valid", extractedError)
}

export {validateData};