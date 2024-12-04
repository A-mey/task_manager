import { Logger } from "./params.log.service";
import { catchError } from "../../helpers/catch.helper";

class LogService {
    logger: Logger;
    constructor () {
        this.logger = new Logger()
    }

    createLogEntry = (...message: unknown[]): Record<string, any> => {
        try {
            // const requestId = this.requestIdLogger.getRequestId();
            // const userId = this.userIdLogger.getUserId();
            const trace = this.getStack();
            let log: Record<string, any> = {trace: trace};
            message.forEach((item, index) => {
                log[`${index + 1}`] = item;
              });
            return log;
        } catch (error) {
            throw new Error(catchError(error));
        }
    }

    getStack = () => {
        const error = new Error();
        const trace = error.stack?.split('\n')[4].trim().split(" ")[1];
        return trace;
    }

    log = (...variableValue: unknown[]) => {
        try {
            const log = this.createLogEntry(variableValue);
            // console.log(log);
            this.logger.logger.info(log);
        } catch (error) {
            throw new Error(catchError(error));
        }
    }

    warn = (...variableValue: unknown[]) => {
        try {
            const log = this.createLogEntry(variableValue);
            this.logger.logger.warn(log);
        } catch (error) {
            throw new Error(catchError(error));
        }
    }

    error = (...variableValue: unknown[]) => {
        try {
            const log = this.createLogEntry(variableValue);
            this.logger.logger.error(log);
        } catch (error) {
            throw new Error(catchError(error));
        }
    }
}

export default new LogService()