Login and Register Application
This is a Login and Register application built using React for the frontend and Node.js with MongoDB for the backend. It provides user authentication functionality, allowing users to register and log in securely.

Features
User Registration: Allows new users to register with name, email, and password. Password validation is enforced for security.
User Login: Enables registered users to log in using their credentials.
Session Management: Implements secure session handling using JSON Web Tokens (JWT).
Validation: Includes front-end and back-end validation for user inputs.
Bootstrap Styling: UI styled with Bootstrap for responsive and visually appealing design.
Toast Notifications: Real-time feedback using react-toastify.
Technologies Used
Frontend:
React
React Router
Bootstrap
React Toastify
Backend:
Node.js
Express.js
MongoDB
JWT (JSON Web Tokens)
bcryptjs for password hashing
Getting Started
Prerequisites
Ensure you have the following installed on your machine:

Node.js (v14 or later)
MongoDB
Git

//!Project Structure

root/
├── server/
│ ├── models/ # MongoDB models
│ ├── routes/ # API routes
│ ├── controllers/ # Route controllers
│ ├── .env # Environment variables
│ ├── index.js # Backend entry point
│ └── ...
├── client/
│ ├── src/
│ │ ├── components/ # Reusable components
│ │ ├── pages/ # Application pages
│ │ ├── App.jsx # React App component
│ │ └── ...
│ └── ...
└── README.md # Project documentation
