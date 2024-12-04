import winston, { format, transports } from 'winston';
import { catchError } from '../../helpers/catch.helper';

export class Logger {
    logger: winston.Logger;

    constructor () {
        this.logger = this.createLogger();
    }

    createLogger(): winston.Logger {
        try {
            const logger: winston.LoggerOptions = {
                level: 'info',
                format: winston.format.json(),
            }
            {
                logger.transports = new transports.Console({
                    level: 'info',
                    format: format.combine(
                    //   format.colorize(),
                    format.json()
                    )
                })
            }
            return winston.createLogger(logger);
        } catch (error) {
            throw new Error(catchError(error));
        }
    }
}