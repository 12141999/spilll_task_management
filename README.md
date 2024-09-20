# Task Management Application

## Overview

This is a simple task management application built with Node.js, Express, and MongoDB. It provides user authentication and allows users to manage their tasks. Each user can create, view, update, and delete their own tasks.

## Features

- User registration and login with JWT-based authentication
- Create, read, update, and delete tasks
- Pagination and sorting for tasks
- Input validation and error handling
- Testing using Mocha and Chai

## Technologies Used

- **Node.js**: JavaScript runtime for building server-side applications
- **Express**: Web framework for Node.js
- **MongoDB**: NoSQL database for storing user and task data
- **Mongoose**: ODM library for MongoDB
- **Bcrypt**: Library for hashing passwords
- **jsonwebtoken**: Library for generating and verifying JSON Web Tokens
- **express-validator**: Middleware for validating request data
- **Mocha**: Testing framework
- **Chai**: Assertion library for testing

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/spilll_task_management.git
   cd spilll_task_management

2. **Install Dependencies:**
   - npm install
   - 
3. **Set Up Environment Variables:**
   - MONGOURL= mongodb://localhost:27017/spilll_task_management
   - JWT_SECRET= robin12@
   - PORT=3000
     
4. **Start the Server:**
   - npm start

5. **Run test cases:**
   - npm test
  
