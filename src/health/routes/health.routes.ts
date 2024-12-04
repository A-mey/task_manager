import express, { Router } from "express";
import { RoutesInterface } from "../../common/interfaces/routes.interfaces";
import { HealthController } from "../controllers/health.controller";

export class HealthRoute implements RoutesInterface {
    private name = "ProductRoute";
    app: express.Application;
    healthController: HealthController;
    router: Router;

    constructor (healthController : HealthController) {
        this.app = express.application;
        this.healthController = healthController;
        this.router = express.Router();
        this.configureRoutes();
    }

    configureRoutes () {
        this.router.route("/")
            .get(this.healthController.checkHealth);

        return this.router;
    }

    getName () : string {
        return this.name;
    }
}