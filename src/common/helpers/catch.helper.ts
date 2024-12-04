export const catchErrorWithSlack = (error: unknown) : {message: string, stack?: string} => {
    if (error instanceof Error) {
        return {message: error.message, stack: error.stack};
    }
    else {
        return {message: String(error)}
    }
}

export const catchError = (error: unknown) : string => {
    if (error instanceof Error) {
        return error.message;
    }
    return String(error);
}