import express from "express";
import { RoutesInterface } from "../interfaces/routes.interfaces";
import { HealthRoute } from "../../health/routes/health.routes";
import { HealthController } from "../../health/controllers/health.controller";
import { TaskController } from "../../task/controllers/task.controller";
import { TaskRoute } from "../../task/routes/task.routes";
import { TaskUtil } from "../../task/utils/task.util";
import { TaskDao } from "../../task/dao/task.dao";
import { UUIDService } from "../services/uuid/uuid.service";
import swaggerSpec from '../../common/services/swagger/swagger.service';
import swaggerUi from 'swagger-ui-express';

export default class Dependency {
    routes: Array<RoutesInterface> = [];
    app: express.Application;

    constructor(app: express.Application) {
        this.app = app;
    }
    getRoutes = () => {
        this.app.use("/backend/v1/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))
        this.app.use("/backend/v1/health", new HealthRoute(new HealthController).router)
        this.app.use("/backend/v1/tasks", new TaskRoute(new TaskController(new TaskUtil(new TaskDao, new UUIDService))).router)
    }
}