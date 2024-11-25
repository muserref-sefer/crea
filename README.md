
# Fullstack Application

This is a fullstack application built with a client and server setup.

## Features

- **Client:** React application for the frontend, managing user interface and interactions.
- **Server:** Node.js backend with API endpoints for data management.
- **State Management:** Redux toolkit used for global state management.
- **Testing:** Includes Jest for unit and integration tests.

---

## Project Structure

```
project/
├── client/         # React application for the frontend
├── server/         # Node.js backend for the application
├── package.json    # Project scripts and dependencies
├── README.md       # Project documentation
```

---

## Setup Instructions

1. Clone the repository:

   ```bash
   git clone https://github.com/muserref-sefer/crea.git
   cd crea
   ```
2. Run `npm run install:all` to install dependencies.
3. Build the application: `npm run build:server`
4. Start the application using `npm start`.

---

## Scripts

The following npm scripts are available:

### Installing Dependencies
- `npm run install:all`: Installs dependencies for both client and server.

### Building the Application
- `npm run build`: Builds both the client and server.

### Starting the Application
- `npm start`: Runs both the client and server using the `concurrently` library.

### Running Tests
- `npm run test:client`: Runs tests for the client application using Jest.

---

## Environment Variables

You need the following environment variables:

### For the Server
- `PORT` - Port on which the server runs.
- `MONGO_URI` - URL for the database connection.
- `JWT_SECRET` - Secret key for authentication.
- `PROXY_ORIGIN` - URL for the React App.

### For the Client
- `REACT_APP_API_URL` - URL for the backend API.

---

## Testing

1. Write test cases for both frontend and backend.
2. Run client tests using `npm run test:client`.

---
