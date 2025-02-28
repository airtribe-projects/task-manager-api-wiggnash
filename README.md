## Task Manager Express Server

## Description

This is a Task Manager Express Server built using Node.js and Express.js.

## Features

- Retrieve all the tasks along with sorting and filtering options.
- Create a new task.
- Update an existing task.
- Delete a task.
- Retrieve a single task by ID.
- Retrieve tasks by priority.

Prerequisites
- Node.js installed on your machine.
- Express.js installed on your machine.

## Usage

- Start the server by running `npm run dev`
- Access the API endpoints using a tool like Postman or curl.

## API Endpoints

- GET /tasks - Retrieve all tasks.
- POST /tasks - Create a new task.
- GET /tasks/:id - Retrieve a single task by ID.
- PATCH /tasks/:id - Update the status of the existing task.
- PUT /tasks/:id - Update the details of the existing task.
- DELETE /tasks/:id - Delete a task.
- GET /tasks/priority/:priority - Retrieve tasks by priority.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
