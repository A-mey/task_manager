import express, { NextFunction } from "express";
import { SchemaService } from "../../services/schema/schema.service";
import { ValidationUtil } from "./validation.util"
import { errorMessage } from "../../types/errorMessage.type";
import { jsonHasValues } from "../../helpers/jsonHasValues.helper";

export class BodyValidationMiddleware {

    schemaService: SchemaService;
    schema: object;
    schemaValue: object = {};
    validationUtil: ValidationUtil;

    constructor(schema: object, schemaKey?: string) {
        this.schemaService = new SchemaService();
        this.validationUtil = new ValidationUtil();
        this.schema = schema;
        if (schemaKey) {
            schemaKey = schemaKey as keyof typeof this.schema;
            this.schemaValue = this.schema[schemaKey] as keyof typeof this.schema;
        }
    }

    checkSchema = (req: express.Request, res: express.Response, next: NextFunction) => {
        console.log("req body", req.body);
        const schema = this.getSchema(req);
        if (!schema) {
            return next();
        }
        const errorRes: errorMessage = this.validationUtil.checkSchemaUtil(schema, req.body);
        if (errorRes.isValid) {
            next();
        } else {
            const response = { status: false, message: errorRes.errorMsg }
            res.status(400).json(response);
        }
    }

    getSchema = (req: express.Request) => {
        let schema: never;
        console.log("schemaValue", this.schemaValue);
        if (!jsonHasValues(this.schemaValue)) {
            schema = this.getSchemaForNoSchemaKeyProvided(req);
        } else {
            schema = this.schemaValue as (keyof typeof this.schema);
        }
        return schema;
    }

    getSchemaForNoSchemaKeyProvided = (req: express.Request) => {
        const key = this.createKey(req);
        const schema = this.schema[key];
        return schema;
    }

    createKey = (req: express.Request) => {
        const originalUrl = this.getOriginalUrl(req);
        const method = req.method;
        const key: (keyof typeof this.schema) = method + originalUrl as (keyof typeof this.schema)
        return key;
    }

    getOriginalUrl = (req: express.Request) => {
        let originalUrl = req.baseUrl.replaceAll("/", "");
        return originalUrl;
    }
}