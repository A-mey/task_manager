export const jsonHasValues = (json: Object) => {
    if (!json) {
        return false;
    }
    if (Object.keys(json).length) {
        return true
    } else {
        return false;
    }
}