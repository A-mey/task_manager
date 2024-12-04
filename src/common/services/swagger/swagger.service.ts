import swaggerJsDoc from 'swagger-jsdoc';

// Swagger definition
const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "Express API Documentation",
        version: "1.0.0",
        description: "API documentation for the Express application",
    },
    tags: [
        {
            name: 'Task',
            description: 'Operations related to Tasks',
        }
    ],
    servers: [
        {
            url: "http://localhost:3000",
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: ["./src/*/routes/*.routes.ts"], // Adjusted path to scan route files in each module
};

const swaggerSpec = swaggerJsDoc(options);

export default swaggerSpec;