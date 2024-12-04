import { ErrorObject } from "ajv";
import { catchError } from "../../helpers/catch.helper";


class SchemaError {
    constructor() {}

    getError = (error: ErrorObject) => {
        let err: string = "";
        try {
            console.log(error);
            switch(error.keyword) {
                case 'additionalProperties':
                    err = `Unable to find property ${error.params.additionalProperty}`
                    break;
                case 'required':
                    err =  `Missing property ${error.params.missingProperty}`
                    break;
                case 'type':
                case 'format':
                case 'enum':
                    err = `Invalid type for property ${error.instancePath}`
                    break;
                case 'oneOf':
                    err = `Fields combination does not match`
                default:
                    err = "Unknown error"
    
            }
        }
        catch(e) {
            console.log(catchError(e));
            err = "Unknown error"
        }
        return err;
    }
}

export default new SchemaError()