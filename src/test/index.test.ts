import assert from 'assert';
import { describe, it, before, beforeEach, mock } from 'node:test';
import { TaskUtil } from '../task/utils/task.util';
import { UUIDService } from '../common/services/uuid/uuid.service';
import { TaskDaoMock } from '../task/dao/task.dao.mock';

describe('tests: taskUtil', () => {

    let taskUtil: TaskUtil;
    let taskDaoMock: TaskDaoMock;

    before(() => {
        taskDaoMock = new TaskDaoMock;
        taskUtil = new TaskUtil(taskDaoMock, new UUIDService)
    });

    beforeEach(() => {

    })

    it ('addTaskUtil', async () => {
        const data = await taskUtil.addTaskUtil({title: "Buy groceries", description: "Get milk, eggs"});
        assert.deepEqual(data, {id: "12345", title: "Buy groceries", description: "Get milk, eggs", status: "pending"})
    });

    it ('getAllTasksUtil', async () => {
        const data = await taskUtil.getAllTasksUtil();
        assert.deepEqual(data, [{id: "12345", title: "Buy groceries", description: "Get milk, eggs", status: "pending"}])
    });
});