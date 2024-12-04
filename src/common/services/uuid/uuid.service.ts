import { v4 as uuidv4 } from 'uuid';

export class UUIDService {
    constructor () {

    }

    getUUID = () => {
        if (process.env.NODE_ENV) {
            return uuidv4();
        } else {
            return "12345"
        }
    }
}