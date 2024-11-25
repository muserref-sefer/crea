# Crea Product Showcase

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [File Structure](#file-structure)

---

## Overview

This project is a modern, React-based crea application that allows users to explore products, view detailed information, and interact with user-friendly features like ratings and image sliders. The application is built with a scalable architecture and robust testing setup.

---

## Features

- **Product Listing**: Displays of all available products.
- **Product Details**: Detailed view including description, images, pricing, and user ratings.
- **Error Handling**: Graceful error messages for failed API calls or missing data.
- **Loading State**: Displays a loader while data is being fetched.
- **Redux State Management**: Centralized state management for seamless application flow.
- **Unit Testing**: Comprehensive test coverage with Jest and React Testing Library.

---

## Technologies Used

### Frontend
- **React**: Component-based UI library.
- **Redux**: State management for predictable application state.
- **React Router**: Declarative routing for navigation.
- **TypeScript**: Static typing for safer and more maintainable code.

### Backend Integration
- **Axios**: HTTP client for API communication.

### Testing
- **Jest**: JavaScript testing framework.
- **React Testing Library**: Testing utility for React components.

---

## Installation

1. Install dependencies:

   ```bash
   npm install
   ```

2. Run the application:

   ```bash
   npm start
   ```

3. Automatically open your browser and navigate to `http://localhost:3000`.

---

## Usage

### Running the Application
- **Start the development server**: `npm start`
- **Build for production**: `npm run build`

### Application Pages
- **Home Page**: Lists available products.
- **Product Details**: Displays detailed information for a selected product.

---

## Testing

### Running Tests
Run tests using the following command:

```bash
npm test
```

### Test Coverage
- **Component Rendering**: Verifies UI components render as expected.
- **API Integration**: Mocks API calls for predictable testing.
- **Error Handling**: Tests various edge cases for robust error handling.

---

## File Structure

```plaintext
client/
├── src/
│   ├── components/
│   │   ├── Common/            # Reusable components (e.g., Loader, ErrorMessage)
│   │   ├── Product/           # Product-specific components (e.g., ImageSlider, ReviewsSection)
│   ├── pages/                 # Main application pages (e.g., ProductList, ProductDetail)
│   ├── services/              # API service functions (e.g., ProductService)
│   ├── store/                 # Redux store and slices
│   ├── utils/                 # Helper functions (e.g., date formatting)
│   ├── App.tsx                # Main application entry point
│   ├── index.tsx              # React DOM rendering entry point
├── jest.config.js             # Jest configuration file
├── tsconfig.json              # TypeScript configuration
├── README.md                  # Project documentation
```

---