export default new class TaskSchema {
    public readonly schema = {

        "POSTbackendv1tasks": {
            type: "object",
            additionalProperties: false,
            required: ["title", "description"],
            properties: {
                "title": {
                    type: "string"
                },
                "description": {
                    type: "string"
                }
            }
        },

        "PUTbackendv1tasks": {
            type: "object",
            additionalProperties: false,
            required: ["status"],
            properties: {
                "status": {
                    type: "string",
                    enum: ["pending", "completed"]
                }
            }
        }
    }
    
}