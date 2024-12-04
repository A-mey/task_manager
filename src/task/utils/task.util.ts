import { catchError } from "../../common/helpers/catch.helper"
import { UUIDService } from "../../common/services/uuid/uuid.service";
import { TaskDao } from "../dao/task.dao";
import { ITaskDaoInterface } from "../interfaces/ITask.dao.interface";
import { inputTask } from "../types/input.task";
import { task } from "../types/task.input";

export class TaskUtil {
    taskDao: ITaskDaoInterface;
    uuid: UUIDService;
    constructor (taskDao: ITaskDaoInterface, uuid: UUIDService) {
        this.taskDao = taskDao;
        this.uuid = uuid;
    }

    addTaskUtil = async (body: inputTask) => {
        try {
            const newBody: task = {
                id: this.uuid.getUUID().replaceAll("-", ""),
                title: body.title,
                description: body.description,
                status: "pending"
            };
            await this.taskDao.addTaskDao(newBody);
            return newBody
        } catch (error) {
            throw new Error(catchError(error));
        }
    }

    getAllTasksUtil = async () => {
        try {
            const data = await this.taskDao.getAllTasksDao();
            return data;
        } catch (error) {
            throw new Error(catchError(error));
        }
    }

    updateTaskStatusUtil = async (id: string, status: string) => {
        try {
            const task = await this.getTaskByIdUtil(id, status);
            task.status = status;
            await this.taskDao.updateDataById(id, status);
            return task;
        } catch (error) {
            throw new Error(catchError(error));
        }
    }

    getTaskByIdUtil = async (id: string, status: string) => {
        try {
            const task = await this.taskDao.getParticularTaskById(id);
            if (!task) {
                throw new Error("404, Task not found")
            }
            if (task.status === status) {
                throw new Error("304, Status is already the same")
            }
            return task;
        } catch (error) {
            throw new Error(catchError(error));
        }
    }

    deleteTaskById = async (id: string) => {
        try {
            await this.taskDao.deleteTaskById(id);
        } catch (error) {
            throw new Error(catchError(error));
        }
    }

    getTaskAsPerStatus = async (status: string) => {
        try {
            const data = await this.taskDao.getTaskAsPerStatusDao(status);
            return data;
        } catch (error) {
            throw new Error(catchError(error));
        }
    }
}