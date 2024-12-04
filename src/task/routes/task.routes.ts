import express, { Router } from "express";
import { RoutesInterface } from "../../common/interfaces/routes.interfaces";
import { TaskController } from "../controllers/task.controller";
import { BodyValidationMiddleware } from "../../common/middleware/bodyValidation/validation.middleware";
import TaskSchema from "../schema/task.schema";

export class TaskRoute implements RoutesInterface {
    private name = "TaskRoute";
    app: express.Application;
    taskController: TaskController;
    router: Router;

    constructor (taskController : TaskController) {
        this.app = express.application;
        this.taskController = taskController;
        this.router = express.Router();
        this.configureRoutes();
    }

    configureRoutes () {

        /**
         * @swagger
         * /backend/v1/tasks:
         *   post:
         *     summary: Add items to tasks
         *     tags:
         *       - Task
         *     description: Add items to tasks and retrieve the task
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties: 
         *                 title:
         *                   type: string
         *                   example: "Buy groceries"
         *                 description:
         *                   type: string
         *                   example: "Get milk, eggs"
         *     responses:
         *       201:
         *         description: Returns the item with Id and status
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 message:
         *                   type: string
         *                   example: "Task created successfully"
         *                 task:
         *                   type: object
         *                   properties:
         *                     id:
         *                       type: string
         *                       example: "12345"
         *                     title:
         *                       type: string
         *                       example: "Buy groceries"
         *                     description:
         *                       type: string
         *                       example: "Get milk, eggs"
         *                     status:
         *                       type: string
         *                       example: "pending"
         */
        this.router.route("/")
            .post(
                new BodyValidationMiddleware(TaskSchema.schema).checkSchema,
                this.taskController.addTask
            );

        this.router.route("/")
            .get(
                this.taskController.getAllTasks
            );

        this.router.route("/:id")
            .put(
                new BodyValidationMiddleware(TaskSchema.schema).checkSchema,
                this.taskController.updateTaskStatus
            );

        this.router.route("/:id")
            .delete(this.taskController.deleteTask);

        this.router.route("/status/:status")
            .get(this.taskController.getTaskAsPerStatus);     

        return this.router;
    }

    getName () : string {
        return this.name;
    }
}