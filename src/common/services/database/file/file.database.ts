import * as fs from 'fs/promises';
import { catchError } from '../../../helpers/catch.helper';
import { isJsonString } from '../../../helpers/isJsonParsable.helper';

export class FileDatabase {
    filePath: string;
    constructor () {
        this.filePath = process.cwd() + "\\src\\common\\models\\"
    }

    addData = async (model: string, data: any) => {
        try {
            console.log("this.filePath", `this.filePath/${model}`);
            const content = await fs.readFile(`${this.filePath}/${model}`, 'utf8');
            if (content && isJsonString(content)) {
                let contentJson = JSON.parse(content);
                contentJson = contentJson.concat(data);
                contentJson = JSON.stringify(contentJson, null, 2)
                await fs.writeFile(`${this.filePath}/${model}`, contentJson);
            } else {
                throw new Error("Something went wrong");
            }
        } catch (error) {
            throw new Error(catchError(error));
        }
    }

    getAllData = async (model: string) => {
        try {
            const content = await fs.readFile(`${this.filePath}/${model}`, 'utf8');
            if (content && isJsonString(content)) {
                let contentJson = JSON.parse(content);
                return contentJson;
            } else {
                throw new Error("Something went wrong");
            }
        } catch (error) {
            throw new Error(catchError(error));
        }
    }

    getDataAsPerField = async (model: string, field: string, value: any) => {
        try {
            const content = await fs.readFile(`${this.filePath}/${model}`, 'utf8');
            if (content && isJsonString(content)) {
                let contentJson = JSON.parse(content);
                return contentJson.find((x: any) => x[field] === value);
            } else {
                throw new Error("Something went wrong");
            }
        } catch (error) {
            throw new Error(catchError(error));
        }
    }

    addNewData = async (model: string, data: any) => {
        try {
            await fs.writeFile(`this.filePath/${model}`, JSON.stringify(data, null, 2));
        } catch (error) {
            throw new Error(catchError(error));
        }
    }

    removeData = async (model: string, field: string, value: string) => {
        try {
            const content = await fs.readFile(`this.filePath/${model}`, 'utf8');
            if (content && isJsonString(content)) {
                let contentJson = JSON.parse(content);
                contentJson = contentJson.filter((x: any) => x[field] !== value);
                await this.addNewData(`this.filePath/${model}`, contentJson);
            } else {
                throw new Error("Something went wrong");
            }
        } catch (error) {
            throw new Error(catchError(error));
        }
    }

    updateData = async (model: string, field: string, value: string, newValue: string) => {
        try {
            const content = await fs.readFile(`this.filePath/${model}`, 'utf8');
            if (content && isJsonString(content)) {
                const newContentJson: any = [];
                let contentJson = JSON.parse(content);
                contentJson.forEach((x: any) => {
                    if (x[field] !== value) {
                        x[field] = newValue
                    }
                    newContentJson.push({...x});
                });
                await this.addNewData(`this.filePath/${model}`, newContentJson);
            } else {
                throw new Error("Something went wrong");
            }
        } catch (error) {
            throw new Error(catchError(error));
        }
    }

    getFilteredDataAsPerField = async (model: string, field: string, value: any) => {
        try {
            const content = await fs.readFile(`${this.filePath}/${model}`, 'utf8');
            if (content && isJsonString(content)) {
                let contentJson = JSON.parse(content);
                return contentJson.filter((x: any) => x[field] === value);
            } else {
                throw new Error("Something went wrong");
            }
        } catch (error) {
            throw new Error(catchError(error));
        }
    }
}
