export interface ITaskDaoInterface {
    addTaskDao(data: any): Promise<void>;
    getAllTasksDao(): Promise<any[]>;
    getParticularTaskById(id: string): Promise<any>;
    updateDataById(id: string, status: string): Promise<void>;
    deleteTaskById(id: string): Promise<void>;
    getTaskAsPerStatusDao(status: string): Promise<any[]>;
}