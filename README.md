# Backend Developer Project Using ExpressJS and MySQL

## Overview

This project is a simple backend application built with **ExpressJS** and **MySQL**. The main goal of this project is to provide a CRUD (Create, Read, Update, Delete) system for managing data in a MySQL database.

To simplify database interactions and accelerate development, this project uses **Prisma** as the ORM (Object-Relational Mapping) tool. Prisma facilitates data manipulation in the database in a more efficient and structured manner, making data management and complex query creation easier.

## Key Features

- **Create**: Add new data to the database.
- **Read**: Retrieve and display existing data from the database.
- **Update**: Modify existing data in the database.
- **Delete**: Remove data from the database.

## Tools and Technologies Used

- **ExpressJS**: A Node.js framework for building backend servers and APIs.
- **MySQL**: A relational database management system for storing data.
- **Prisma**: An ORM for facilitating database operations with type-safe data and efficient queries.

By using Prisma, development becomes faster and easier, as Prisma handles many technical aspects of database interactions, allowing developers to focus on business logic and application features.

## Usage
Follow these steps to set up and run the project:


1. **Clone Repository**

   ```bash
   git clone https://github.com/jellanarta/asaplombok.git
  

2. **Navigate to Project Directory**
    Move to the project directory (for example, if the folder name is asaplombok):
    ```bash
    cd asaplombok
    
3. **Install Dependencies**
    Install the required packages as listed in package.json:
    ```bash
    npm install
    # atau
    yarn install
    
4. **Configure Database Connection**
    Set up the database connection in the .env file. This file should contain the following line:
    ```bash
    DATABASE_URL="mysql://username:password@localhost:3306/databasename"
    ```
    For example, if using MySQL with an empty password, the connection URL might look like this:
    ```bash
    DATABASE_URL="mysql://root:@localhost:3306/asaplombok"
    ```
5. **Create MySQL Database**
    Ensure that the MySQL database exists. You can create it using a MySQL client or command-line tool:
    ```bash
    CREATE DATABASE asaplombok;
    ```
6. **Run Prisma Migrations**
    Generate the Prisma client and apply migrations to create the necessary tables (e.g., a table named task as per the model in prisma/schema.prisma). Ensure the database specified in the .env file exists.
    ```bash
    npx prisma migrate dev
    ```
    This command will create tables based on your Prisma schema and apply any pending migrations.


## API Reference

### CREATE

**POST** `/tasks`

**Description**: Create new data to be stored in the Task table in the database.

**Post Body**:

- `title` (string): **Required**.
- `description` (string): **Required**.
- `dueDate` (string): **Required**. Due date in the format `YYYY-MM-DD`.
- `status` (string): **Required**. Status. Must be one of  `PENDING`, `IN_PROGRESS`, or `COMPLETED`.

**Example POST**:

```json
{
  "title": "Finish report",
  "description": "Complete the quarterly financial report.",
  "dueDate": "2024-08-20",
  "status": "PENDING"
}
```

**Example Response Success 200 OK**:
```json
{
    "id": 3,
    "title": "Finish report",
    "description": "Complete the quarterly financial report.",
    "dueDate": "2024-08-20T00:00:00.000Z",
    "status": "PENDING",
    "createdAt": "2024-08-15T07:20:54.990Z",
    "updatedAt": "2024-08-15T07:20:54.990Z"
}
```

**Example Response error 400 Bad Request**:
```json
{
    "error": true,
    "message": "Title must have at least 5 characters.",
    "path": "title"
}
```


### READ
**Description**: Retrieve all data with or without a query and retrieve a single data item by a specific ID.

**GET** `/tasks?`

**Query GET data**:
```bash
   /tasks
   /tasks?dueDate=2024-08-30
   /tasks?status=PENDING
   /tasks?status=PENDING&dueDate=2024-08-30
   ```

**Example Response Success 200 OK**:
```json
[
    {
        "id": 3,
        "title": "Finish report",
        "description": "Complete the quarterly financial report.",
        "dueDate": "2024-08-20T00:00:00.000Z",
        "status": "PENDING",
        "createdAt": "2024-08-15T07:20:54.990Z",
        "updatedAt": "2024-08-15T07:20:54.990Z"
    },
    {
        "id": 1,
        "title": "ddssssssm",
        "description": "sssss",
        "dueDate": "2024-08-30T00:00:00.000Z",
        "status": "COMPLETED",
        "createdAt": "2024-08-15T03:50:04.239Z",
        "updatedAt": "2024-08-15T05:59:33.093Z"
    }
]
```

**GET** `/tasks/:id`
```bash
   /tasks/1
   ```
**Example Response**:
```josn
{
    "id": 1,
    "title": "ddssssssm",
    "description": "sssss",
    "dueDate": "2024-08-30T00:00:00.000Z",
    "status": "COMPLETED",
    "createdAt": "2024-08-15T03:50:04.239Z",
    "updatedAt": "2024-08-15T05:59:33.093Z"
}
```

### UPDATE
**Description**: Update specific columns in existing data in the database based on its ID

**Put Body**:

- `title` (string): **Opsional**.
- `description` (string): **Opsional**.
- `dueDate` (string): **Opsional**. Due date in the format `YYYY-MM-DD`.
- `status` (string): **Opsional**. Status. Must be one of  `PENDING`, `IN_PROGRESS`, or `COMPLETED`.


**PUT** `/tasks/:id`

**Example PUT**:
```bash
   /tasks/1
   ```
```json
{
  "title": "Update id 1",
  "description": "Description Update."
}
```
**Example Response Success**:
```json
{
    "id": 1,
    "title": "Update id 1",
    "description": "Description Update.",
    "dueDate": "2024-08-30T00:00:00.000Z",
    "status": "COMPLETED",
    "createdAt": "2024-08-15T03:50:04.239Z",
    "updatedAt": "2024-08-15T07:54:26.654Z"
}
```
**Example Response Error**:
```json
{
    "error": true,
    "message": "Title cannot be empty.",
    "path": "title"
}
```

### DELETE
**Description**: Hapus data yang sudah ada di dalam database berdasarkan id

**DELETE** `/tasks/:id`

**Example DELETE**:
```bash
   /tasks/1
   ```

**Example Response Success**:
```json
{
    "status": true,
    "message": "Data with ID 1 has been successfully deleted.",
    "data": {
        "id": 1,
        "title": "Update id 1",
        "description": "Description Update.",
        "dueDate": "2024-08-30T00:00:00.000Z",
        "status": "COMPLETED",
        "createdAt": "2024-08-15T03:50:04.239Z",
        "updatedAt": "2024-08-15T07:54:26.654Z"
    }
}
```

**Example Response Error**:
```json
{
    "error": true,
    "message": "Data not found : Id 1",
    "path": "id"
}
```