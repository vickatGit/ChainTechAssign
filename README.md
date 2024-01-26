# Task Management API

## Task Management API

This API provides a set of features for managing tasks. Users can create tasks by specifying a title and description. Additionally, they have the ability to view a comprehensive list of all tasks, mark tasks as completed, edit task details, and delete tasks as needed. This API facilitates a flexible and efficient task management system, empowering users to organize and track their tasks seamlessly.

## Tech Stack

- Typescript
- Node.js
- Express.js
- MongoDB
- Jest
- Supertest

## Setup

```jsx
git clone git@github.com:vickatGit/ChainTechAssign.git
cd project-path
npm install
npm run dev
```

### Run Tests

```jsx
npm run jest:watch
```

## Documentation

### Registration

- validation is added to `email` and `password` and password should be minimum 8 characters and should at least one capital and small letter and number should be include and at least one special character is needed otherwise it throws the error

```jsx
const baseUrl="http://localhost:8081/"
axios.post(apiUrl, {email,userName,password})
  .then(response => {
    console.log('Signup successful:', response.data);
  })
  .catch(error => {
    console.error('Error during signup:', error.response.data);
  });
```

### Login

- validation is added to `email` and `password` and password should be minimum 8 characters and should at least one capital and small letter and number should be include and at least one special character is needed otherwise it throws the error

```jsx
const baseUrl = "http://localhost:8080/";

axios.post(`${baseUrl}auth/login`, { email, password })
  .then(response => {
    console.log('Login successful:', response.data);
  })
  .catch(error => {
    console.error('Error during login:', error.response.data);
  });
```

### Get Tasks

Get All Tasks

```jsx
const baseUrl = "http://localhost:8081/";

axios.get(`${baseUrl}tasks/tasks`)
  .then(response => {
    console.log('All tasks:', response.data);
  })
  .catch(error => {
    console.error('Error fetching tasks:', error.response.data);
  });
```

Get Tasks By Category

```jsx
const baseUrl = "http://localhost:8080/";
const category = "Study";

axios.get(`${baseUrl}tasks/tasks?category=${category}`)
  .then(response => {
    console.log(`Tasks with category ${category}:`, response.data);
  })
  .catch(error => {
    console.error(`Error fetching tasks by category ${category}:`, error.response.data);
  });
```

Get Tasks By Status

```jsx
const baseUrl = "http://localhost:8080/";
const status = "Completed";

axios.get(`${baseUrl}tasks/tasks?status=${status}`)
  .then(response => {
    console.log(`Completed tasks:`, response.data);
  })
  .catch(error => {
    console.error(`Error fetching completed tasks:`, error.response.data);
  });
```

Filter Tasks Based on Due Date

```jsx
const baseUrl = "http://localhost:8080/";
const filterDate = "2024-01-26T20:11:00.678Z";
const isBefore = false;

axios.get(`${baseUrl}tasks/tasks?filterDate=${filterDate}&isBefore=${isBefore}`)
  .then(response => {
    const beforeOrAfter = isBefore ? 'before' : 'after';
    console.log(`Tasks due ${beforeOrAfter} ${filterDate}:`, response.data);
  })
  .catch(error => {
    console.error(`Error fetching tasks based on due date:`, error.response.data);
  });
```

### Create Task

Note

- `dueDate` should be after current time
- `status` should only one of these [ ”`Pending`”, ”In `Progress`”, ”`Completed`” ]

```jsx
const baseUrl = "http://localhost:8081/";

// Task data to be sent in the request body
const taskData = {
  title: "Title 3",
  description: "Title 3 Description",
  status: "Pending",
  dueDate: "2024-01-27T20:11:00.678Z",
};

// Make a POST request to create a new task
axios.post(`${baseUrl}tasks/task`, taskData)
  .then(response => {
    console.log('Task created successfully:', response.data);
  })
  .catch(error => {
    console.error('Error creating task:', error.response.data);
  });
```

### Update Task

Note

- `dueDate` should be after current time
- `status` should only one of these [ ”`Pending`”, ”In `Progress`”, ”`Completed`” ]
- `taskId` Should be Valid MongoDB Document id

```jsx
const baseUrl = "http://localhost:8081/";
const taskId = "65b2775ddf91b52aef860d6a";

// Updated task data to be sent in the request body
const updatedTaskData = {
  title: "Updated Title",
  description: "Updated Description",
  status: "Completed",
  dueDate: "2024-01-28T15:30:00.000Z",
};

// Make a PATCH request to update the task
axios.patch(`${baseUrl}tasks/task/${taskId}`, updatedTaskData)
  .then(response => {
    console.log('Task updated successfully:', response.data);
  })
  .catch(error => {
    console.error('Error updating task:', error.response.data);
  });
```

### Delete Task

Note

- `taskId` Should be Valid MongoDB Document id

```jsx
const baseUrl = "http://localhost:8080/";
const taskId = "65b2c56d9f50ef32c5b37b48";

// Make a DELETE request to delete the task
axios.delete(`${baseUrl}tasks/task/${taskId}`)
  .then(response => {
    console.log('Task deleted successfully:', response.data);
  })
  .catch(error => {
    console.error('Error deleting task:', error.response.data);
  });
```

### Get Task Category Types

```jsx
const baseUrl = "http://localhost:8080/";

// Make a GET request to fetch all task categories
axios.get(`${baseUrl}tasks/categories`)
  .then(response => {
    console.log('Task categories:', response.data);
  })
  .catch(error => {
    console.error('Error fetching task categories:', error.response.data);
  });
```
