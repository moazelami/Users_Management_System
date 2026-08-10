## 🚀 Project Journey

This project was developed incrementally as I progressed through different **Node.js backend concepts**.

Instead of building the final version directly, the application evolved step by step, with each version introducing new concepts and improving the previous implementation.

### 🟢 Version 1 — Node.js Fundamentals

The project started as a simple **Node.js application** focused on understanding backend fundamentals.

At this stage, the application used:

* Node.js Modules
* CommonJS
* File System (`fs`)
* JSON file storage
* CRUD operations
* Modular architecture
* Authentication
* Password hashing with bcrypt
* Async/Await

Users were stored inside a local JSON file, while the application logic was separated into modules such as:

```text
auth
user_actions
profile
fileManager
```

This version established the core business logic of the application.

---

### 🔵 Version 2 — Native HTTP Server

After building the core functionality, the project was upgraded to use Node.js's native **`http` module**.

The goal was to understand what happens underneath Express and how HTTP servers work at a lower level.

This version introduced:

* HTTP Server
* HTTP Methods
* Request and Response handling
* Manual Routing
* URL Parameters
* Request Body handling
* Streams
* Events
* JSON parsing
* Custom response utilities

Routing was initially handled manually using conditions such as:

```js
if (url === "/users" && method === "GET") {
    // ...
}
```

Request bodies were also handled manually using request streams:

```js
req.on("data", ...);

req.on("end", ...);
```

This stage helped build a deeper understanding of how web servers and HTTP requests work before moving to a framework.

---

### 🟠 Version 3 — Express.js

After understanding the fundamentals of the native Node.js HTTP server, the project was migrated to **Express.js**.

The main goal was to replace the manual HTTP handling with Express's abstractions while keeping the existing business logic.

The project now uses:

* Express.js
* Express Routing
* REST API design
* `app.get()`
* `app.post()`
* `app.put()`
* `app.delete()`
* `app.patch()`
* Route Parameters
* `req.params`
* `req.body`
* `express.json()`
* `res.status()`
* `res.json()`
* Async Route Handlers
* Express 404 handling

For example, instead of manually checking:

```js
if (url === "/users" && method === "GET") {
    // ...
}
```

Express allows the route to be defined directly:

```js
app.get("/users", async (req, res) => {
    // ...
});
```

The project also moved from a custom response utility to Express's native response methods:

```js
res.status(200).json({
    success: true,
    message: "Users retrieved successfully.",
    data: users
});
```

All implemented API endpoints were tested successfully using **Postman**.

---

### 🧩 What Changed Between Versions?

The important part of the journey is that the **core business logic remained largely the same**, while the way the application communicates over HTTP evolved.

```text
Version 1
Node.js Modules
      ↓
File System + Business Logic
      ↓
CRUD + Authentication


Version 2
Node.js HTTP
      ↓
Manual Routing
      ↓
Streams + Events
      ↓
HTTP API


Version 3
Express.js
      ↓
Express Routing
      ↓
Middleware
      ↓
REST API
```

Each version was built on top of the previous one, allowing the project to evolve alongside my understanding of Node.js backend development.
