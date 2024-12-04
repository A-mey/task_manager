import express from "express";
import { responseErrorMessage } from "../../common/helpers/response.error.helper";
import { TaskUtil } from "../utils/task.util";
import { inputTask } from "../types/input.task";

export class TaskController {
    taskUtil: TaskUtil;

    constructor(taskUtil: TaskUtil) {
        this.taskUtil = taskUtil;
    }

    addTask = async (req: express.Request, res: express.Response) => {
        try {
            const body = req.body as inputTask;
            const newBody = await this.taskUtil.addTaskUtil(body);
            res.status(201).json({message: "task created successfully", task: newBody});
        } catch (error) {
            const errorMessage: {statusCode: number; error: string;} = responseErrorMessage(error as string);
            res.status(errorMessage.statusCode).json({"error": errorMessage.error});
        }
    }

    getAllTasks = async (req: express.Request, res: express.Response) => {
        try {
            const data = await this.taskUtil.getAllTasksUtil();
            res.status(200).json(data);
        } catch (error) {
            const errorMessage: {statusCode: number; error: string;} = responseErrorMessage(error as string);
            res.status(errorMessage.statusCode).json({"error": errorMessage.error});
        }
    }

    updateTaskStatus = async (req: express.Request, res: express.Response) => {
        try {
            const id = req.params.id;
            if (!id) {
                throw new Error("id not found");
            }
            const status = req.body.status;
            const updatedTask = await this.taskUtil.updateTaskStatusUtil(id, status);
            res.status(200).json({task: updatedTask, message: "Task updated successfully"});
        } catch (error) {
            const errorMessage: {statusCode: number; error: string;} = responseErrorMessage(error as string);
            res.status(errorMessage.statusCode).json({"error": errorMessage.error});
        }
    }

    deleteTask = async (req: express.Request, res: express.Response) => {
        try {
            const id = req.params.id;
            if (!id) {
                throw new Error("id not found");
            }
            await this.taskUtil.deleteTaskById(id);
            res.status(200).json({message: "Task deleted successfully"});
        } catch (error) {
            const errorMessage: {statusCode: number; error: string;} = responseErrorMessage(error as string);
            res.status(errorMessage.statusCode).json({"error": errorMessage.error});
        }
    }

    getTaskAsPerStatus = async (req: express.Request, res: express.Response) => {
        try {
            const status = req.params.status;
            if (!status) {
                throw new Error("Status not found");
            }
            if (status !== "pending" && status !== "completed") {
                throw new Error("Invalid status");
            }
            const data = await this.taskUtil.getTaskAsPerStatus(status);
            res.status(200).json(data);
        } catch (error) {
            const errorMessage: {statusCode: number; error: string;} = responseErrorMessage(error as string);
            res.status(errorMessage.statusCode).json({"error": errorMessage.error});
        }
    }
}