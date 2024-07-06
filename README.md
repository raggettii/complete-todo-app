# TaskEase

**TaskEase** is a task management application that allows users to create tasks, mark them as completed, and view both current and completed tasks. It features user authentication, task management, and secure data handling.

## Features

- **Task Management**: Create, view, and manage tasks.
- **Task Completion**: Mark tasks as completed and view completed tasks.
- **User Authentication**: Secure user registration and login.
- **Data Security**: Passwords are encrypted using bcrypt.
- **Token Management**: JSON Web Tokens (JWT) are used for user authentication with token expiry logic.
- **Validation**: Zod is used for data validation to ensure data integrity.

## Technologies Used

### Frontend

- **React**: User interface development.
- **Axios**: HTTP client for API requests.

### Backend

- **Express**: Backend framework for handling HTTP requests.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB.
- **Zod**: Data validation library for request validation.
- **bcrypt**: Library for hashing passwords.
- **JWT**: JSON Web Token for user authentication.

## Getting Started

### Prerequisites

- **Node.js**: [Download and install Node.js](https://nodejs.org/)
- **npm**: Node package manager (comes with Node.js)
- **MongoDB**: [Set up MongoDB](https://www.mongodb.com/)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/taskease.git
   cd taskease
2. **Install Dependencies**:
   ````bash
   npm install
   npm i express
   npm i cors
   npm i zod
   npm i mongoose
   npm i bcrypt
   npm i jsonwebtoken
   npm i dotenv
3. **Set up environment variables**:
   Create a .env file in the root directory ie./backend and add the following variables:
   ````env
   MONGO_URL=mongodb://localhost:27017/taskease
   JWT_SECRET=your_jwt_secret
   PORT =3000
4. **Start the backend server**:
   ````bash
   node index.js
5. **Start the frontend server**:
   ````bash
   npm run dev
## Contributions
   Contributions to the TaskEase project are welcome! If you find any issues or have suggestions for improvements, 
   please feel free to open an issue or submit a pull request.
   
   Thank you for using TaskEase Happy Coding! 🚀
