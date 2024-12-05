import { catchError } from "../../common/helpers/catch.helper"
import { FileDatabase } from "../../common/services/database/file/file.database";
import { ITaskDaoInterface } from "../interfaces/ITask.dao.interface";

export class TaskDao implements ITaskDaoInterface {
    fileDataBase: FileDatabase;
    model: string;
    constructor () {
        this.fileDataBase = new FileDatabase();
        this.model = "task.json";
    }

    addTaskDao = async (data: any): Promise<void> => {
        try {
            await this.fileDataBase.addData(this.model, data);
        } catch (error) {
            throw new Error(catchError(error));
        }
    }

    getAllTasksDao = async () => {
        try {
            const data = await this.fileDataBase.getAllData(this.model);
            return data;
        } catch (error) {
            throw new Error(catchError(error));
        }
    }

    getParticularTaskById = async (id: string) => {
        try {
            const data = await this.fileDataBase.getDataAsPerField(this.model, "id", id);
            return data;
        } catch (error) {
            throw new Error(catchError(error));
        }
    }

    updateDataById = async (id: string, status: string) => {
        try {
            await this.fileDataBase.updateData(this.model, "id", id, "status", status);
        } catch (error) {
            throw new Error(catchError(error));
        }
    }

    deleteTaskById = async (id: string) => {
        try {
            await this.fileDataBase.removeData(this.model, "id", id);
        } catch (error) {
            throw new Error(catchError(error));
        }
    }

    getTaskAsPerStatusDao = async (status: string) => {
        try {
            const data = await this.fileDataBase.getFilteredDataAsPerField(this.model, "status", status);
            return data;
        } catch (error) {
            throw new Error(catchError(error));
        }
    }
}