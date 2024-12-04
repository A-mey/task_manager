import loggerService from "../services/logger/logger.service";
import { catchError } from "./catch.helper"

export const responseErrorMessage = (errorMessage: unknown) => {
    try {
        let errorObject = { statusCode: 500, error: "Something went wrong" };
        if (errorMessage instanceof Error) {
            let errorArray = errorMessage.message.split(",")
            loggerService.log("errorArray", errorArray);
            if (errorArray.length > 1) {
                if (!Number.isNaN(errorArray[0])) {
                    let statusCode = parseInt(errorArray[0])
                    statusCode = statusCode? statusCode : 500;
                    errorObject.statusCode = statusCode;
                    errorObject.error = errorArray[1];
                }
            } else {
                errorObject.error = errorMessage.message;
            }
        }
        return errorObject;
    } catch (error) {
        throw new Error(catchError(error));
    }
}