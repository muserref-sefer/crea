
# Server Application

This project is a server-side application built with Node.js, Express, TypeScript, and MongoDB. It includes support for user authentication, environment-based configuration, and database integration using Mongoose.

---

## Features

- **TypeScript**: Typed JavaScript for better development experience.
- **Express**: Lightweight and efficient server-side framework.
- **MongoDB**: NoSQL database integration via Mongoose.
- **Authentication**: JWT-based authentication and authorization.
- **Environment Configuration**: `.env` support via dotenv.
- **Security**: Password hashing using bcrypt.
- **Development Tools**: Nodemon for live reloading during development.

---

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- [MongoDB](https://www.mongodb.com/)
- [npm](https://www.npmjs.com/)

### Steps

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file in the root directory and configure the following:

   ```env
   PORT=5001
   MONGO_URI=database-name
   JWT_SECRET=jwt_secret
   PROXY_ORIGIN=React App URL etc. (http://localhost:3000)
   ```

3. Build the application:

   ```bash
   npm run build
   ```

4. Start the application:

   ```bash
   npm run start
   ```

---

## Scripts

- `npm run start`: Starts the server.
- `npm run dev`: Starts the server in development mode with hot-reloading.
- `npm run build`: Compiles TypeScript into JavaScript.

---

## Project Structure

- **src**: Contains the TypeScript source code.
- **dist**: Generated JavaScript files after building.

---

## Dependencies

### Runtime

- `bcrypt`
- `body-parser`
- `cors`
- `dotenv`
- `express`
- `jsonwebtoken`
- `mongodb`
- `mongoose`

### Development

- `@types/bcrypt`
- `@types/cors`
- `@types/express`
- `@types/jsonwebtoken`
- `@types/node`
- `nodemon`
- `ts-node`
- `typescript`

---
