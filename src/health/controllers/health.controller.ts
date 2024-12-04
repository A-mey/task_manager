import express from "express";
import logger from "../../common/services/logger/logger.service";

export class HealthController {

    checkHealth = (_req: express.Request, res: express.Response) => {
        logger.log("healthcheck");
        res.status(200).json({message: "service is up"});
    }
}