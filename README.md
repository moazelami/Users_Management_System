# 👥 Users Management System

A simple **Node.js** application for managing users with authentication and profile management.

This project was built as a backend practice project to apply fundamental Node.js concepts such as modular architecture, file handling, CRUD operations, password hashing, and authentication.

---

## ✨ Features

### Authentication

- Register a new user
- Login with email and password
- Password hashing using **bcrypt**
- Prevent duplicate email registration

### User Management

- Get user by ID
- Get all users
- Update user information
- Delete a user

### Profile Management

- Update profile
- Change password
- Protect sensitive fields (`id`, `password`, `isAdmin`) from unauthorized updates

### Data Storage

- Store users inside a local JSON file
- Read/write data using the Node.js File System

---

## 📂 Project Structure

```
Users_Management_System/
│
├── data/
│   └── data.json
│
├── modules/
│   ├── auth.js
│   ├── fileManager.js
│   ├── profile.js
│   └── user_actions.js
│
├── main.js
├── package.json
└── README.md
```

---

## 🛠 Technologies

- Node.js
- JavaScript (CommonJS)
- bcrypt
- File System (fs)

---

## 📌 Implemented Functions

### Authentication

- `register()`
- `login()`

### User Actions

- `getUserById()`
- `getAllUsers()`
- `updateUser()`
- `deleteUser()`

### Profile

- `updateProfile()`
- `changePassword()`

---

## 🔒 Security

- Passwords are hashed using **bcrypt** before being stored.
- Passwords are never returned when retrieving users.
- Profile updates cannot modify:
  - User ID
  - Password
  - Admin privileges

---

## 📖 Concepts Practiced

- Modular Programming
- CRUD Operations
- Authentication Basics
- Password Hashing
- Error Handling
- File System Operations
- JSON Data Persistence
- Async/Await

---

## 🔮 Future Improvements

- Express.js REST API
- MongoDB / MySQL integration
- JWT Authentication
- Email Verification
- Input Validation (Joi)
- Role-Based Authorization
- Unit Testing
- Environment Variables (.env)

---

## 👨‍💻 Author

**Moaz Wael Elami**

GitHub: https://github.com/moazelami
