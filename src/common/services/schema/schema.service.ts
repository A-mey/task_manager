import { Ajv, ErrorObject, ValidateFunction } from "ajv";
import format from "./format.schema.service";
import SchemaError from "./error.schema.service"
import { errorMessage } from "../../types/errorMessage.type";

export class SchemaService {
    public readonly ajv: Ajv = new Ajv({
        discriminator: true,
        formats: format
    })

    constructor() { }

    validateSchema = (obj: object, schema: ValidateFunction<unknown>) => {
        const error: errorMessage = {isValid: false, errorMsg: ""};
        const isValid = schema(obj);
        if (isValid) {
            error.isValid = true
        }
        else {
            error.isValid = false;
            const errors: ErrorObject[] | null | undefined = schema.errors;
            if (errors && errors.length) {
                error.errorMsg = SchemaError.getError(errors[0]);
            }
        }
        return error;
    }

    compile = (schema: object) => {
        return this.ajv.compile(schema);
    }
}