# 📒 iNotebook Backend

A RESTful backend for **iNotebook**, built with **Node.js**, **Express.js**, and **MongoDB**. This project handles user authentication, session management, and CRUD operations for notes while serving as the backend API for the React frontend.

> **Project Goal**
>
> This backend was developed to strengthen my understanding of Express.js, MongoDB, Passport.js, authentication, sessions, middleware, and REST API development.

---

## 🚀 About the Project

The backend provides secure APIs for user authentication and note management. It uses **Passport.js** for authentication, **Express Session** for maintaining user sessions, and **MongoDB** for persistent data storage.

This repository contains **only the backend** of the application.

The React frontend is maintained in a separate repository.

---

## ✨ Features

* User Authentication
* Google OAuth Authentication
* Manual Login & Signup
* Session-Based Authentication
* Protected Routes
* User Authorization Middleware
* CRUD APIs for Notes
* MongoDB Session Store
* Password Hashing using bcrypt

---

## 🛠 Tech Stack

| Technology       | Purpose               |
| ---------------- | --------------------- |
| Node.js          | JavaScript Runtime    |
| Express.js       | Backend Framework     |
| MongoDB          | Database              |
| Mongoose         | ODM                   |
| Passport.js      | Authentication        |
| Google OAuth 2.0 | OAuth Authentication  |
| Express Session  | Session Management    |
| Connect Mongo    | Session Storage       |
| bcrypt           | Password Hashing      |
| CORS             | Cross-Origin Requests |

---

## 📂 Project Structure

```text
backend/
│
├── config/
│   └── passport.js
│
├── middlewares/
│   └── isAuthenticated.js
│
├── models/
│   ├── User.js
│   └── Note.js
│
├── routes/
│   ├── auth.js
│   └── notes.js
│
├── database.js
├── server.js
└── package.json
```

---

## 🔐 Authentication Flow

The application uses **Passport.js** together with **Express Sessions** for authentication.

```text
Client

   │

   ▼

Authentication Request

   │

   ▼

Passport.js

   │

Google OAuth / Manual Login

   │

   ▼

Session Created

   │

MongoDB Session Store

   │

   ▼

Authenticated Requests
```

---

## 📦 API Endpoints

### Authentication

| Method | Endpoint                  | Description                       |
| ------ | ------------------------- | --------------------------------- |
| GET    | `/auth/login`           | Start Google OAuth authentication |
| GET    | `/auth/google/callback` | Google OAuth callback             |
| POST   | `/auth/signup`          | Register a new user               |
| POST   | `/auth/login/manual`    | Login using email & password      |
| POST   | `/auth/logout`          | Logout current user               |

---

### Notes

| Method | Endpoint                  | Description         |
| ------ | ------------------------- | ------------------- |
| GET    | `/notes/mynotes`        | Fetch all notes     |
| POST   | `/notes/addnote`        | Create a new note   |
| GET    | `/notes/getnote/:id`    | Fetch a single note |
| PUT    | `/notes/updatenote/:id` | Update a note       |
| DELETE | `/notes/deletenote/:id` | Delete a note       |

---

## ⚙️ Installation

### Clone the repository

```bash
git clone https://github.com/<your-username>/inotebook-backend.git
```

```bash
cd inotebook-backend
```

### Install dependencies

```bash
npm install
```

### Configure Environment

Create a `.env` file (recommended) and configure your credentials.

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/inotebook

SESSION_SECRET=your_secret

GOOGLE_CLIENT_ID=your_google_client_id

GOOGLE_CLIENT_SECRET=your_google_client_secret

FRONTEND_URL=http://localhost:5173
```

> **Note:** The current project stores some of these values directly in the source code. Moving them to environment variables is recommended for production deployments.

---

## ▶️ Running the Server

```bash
npm start
```

or

```bash
node server.js
```

The backend will be available at:

```text
http://localhost:3000
```

---

## 📚 What I Learned

During this project I explored:

* Express.js
* REST API development
* MongoDB & Mongoose
* Passport.js authentication
* Google OAuth integration
* Session-based authentication
* Express middleware
* Route protection
* Password hashing with bcrypt
* Backend project organization

---

## 🔗 Frontend

This backend works together with the React frontend.

Frontend Repository:

```text
https://github.com/programming-base/inotebook.git
```

---

## 👨‍💻 Author

**Gautam Vishwakarma**

If you found this project helpful, feel free to ⭐ the repository.
