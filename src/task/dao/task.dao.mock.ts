import { ITaskDaoInterface } from "../interfaces/ITask.dao.interface";

export class TaskDaoMock implements ITaskDaoInterface {
    mockData: any[] = [];

    async addTaskDao(data: any): Promise<void> {
        this.mockData.push(data);
    }

    async getAllTasksDao(): Promise<any[]> {
        return this.mockData;
    }

    async getParticularTaskById(id: string): Promise<any | undefined> {
        return this.mockData.find((task) => task.id === id);
    }

    async updateDataById(id: string, status: string): Promise<void> {
        const task = this.mockData.find((task) => task.id === id);
        if (task) {
            task.status = status;
        }
    }

    async deleteTaskById(id: string): Promise<void> {
        this.mockData = this.mockData.filter((task) => task.id !== id);
    }

    async getTaskAsPerStatusDao(status: string): Promise<any[]> {
        return this.mockData.filter((task) => task.status === status);
    }
}