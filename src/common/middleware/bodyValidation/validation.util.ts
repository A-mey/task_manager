import { catchError } from "../../helpers/catch.helper";
import { SchemaService } from "../../services/schema/schema.service";
import { errorMessage } from "../../types/errorMessage.type";

export class ValidationUtil {
    schemaService: SchemaService;

    constructor () {
        this.schemaService = new SchemaService();
        
    }

    checkSchemaUtil = (schema: any, body: any) => {
        try {
            const validateSchemaFn = this.schemaService.compile(schema);
            const errorRes: errorMessage = this.schemaService.validateSchema(body, validateSchemaFn);
            return errorRes;
        } catch (error) {
            throw new Error(catchError(error));
        }
    }
    


}