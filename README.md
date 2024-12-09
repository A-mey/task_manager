# task_manager

# How to run the file
Considering you have all the typescript dependencies installed on your local computer, you will need to create env.dev file, as it has not been pushed into the repository

NODE_ENV=dev
PORT=3000

and you can run npm run watch-qc for windows or npm run watch-dev for unix systems

Alternatively, I have provided a Dockerfile.dev which can be built

# Routes

POST: http://localhost:3000/backend/v1/tasks/
GET: http://localhost:3000/backend/v1/tasks/
PUT: http://localhost:3000/backend/v1/tasks/:id
DELETE: http://localhost:3000/backend/v1/tasks/:id
GET: http://localhost:3000/backend/v1/tasks/status/:status

# Unit tests

npm run test will run unit tests for three business functions as an example.

# Documentation

http://localhost:3000/backend/v1/api-docs/#/Task/post_backend_v1_tasks has swagger documentation for post/tasks endpoint as an example

# Database

The data is stored in task.json file in models in common and the data is persistent upon restarts
