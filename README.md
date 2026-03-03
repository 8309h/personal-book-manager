
# 📚 Personal Book Manager

A full-stack Personal Book Manager built using **Next.js (App Router), Node.js, Express, and MongoDB**.

This application allows users to securely manage their personal reading collection — track progress, update reading status, filter books, and maintain a clean reading dashboard.

---

## 🚀 Live Demo

* 🌐 **Frontend (Vercel)**
  [https://personal-book-manager-navy.vercel.app](https://personal-book-manager-navy.vercel.app)

* 🔧 **Backend (Render)**
  [https://personal-book-manager-h60e.onrender.com](https://personal-book-manager-h60e.onrender.com)

---

## 🛠 Tech Stack

### Frontend

* Next.js (App Router)
* React
* Custom CSS 
* Fetch API
* JWT Authentication 

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT (JSON Web Tokens)
* bcrypt
* CORS + Secure Cookie Configuration

### Deployment

* Frontend → Vercel
* Backend → Render
* Database → MongoDB Atlas

---

## ✨ Features

### 🔐 Authentication

* User Signup
* User Login
* Secure Logout
* JWT-based authentication
* HttpOnly secure cookies
* Protected dashboard route

---

### 📚 Book Management

Users can:

* Add new books
* Edit book details
* Delete books
* Update reading status:

  * 📖 Want to Read
  * 📘 Reading
  * ✅ Completed
* Filter books by:

  * Reading status
  * Tags
* View total book count

---

### 📊 Dashboard

* Displays all user books
* Shows total number of books
* Clean card-based UI
* Status badges with color indicators
* Real-time updates after CRUD actions

---

## 📂 Project Structure

```
personal-book-manager/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── app.js
│   │   └── server.js
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── lib/
│   │   └── styles/
│   ├── package.json
│   └── .env.local
│
└── README.md
```

---

## ⚙️ Environment Variables

### Backend (.env)

```
PORT=5000
MONGO_URI=_mongodb_connection_string
JWT_SECRET=your_secret_key
FRONTEND_URL=https://personal-book-manager-navy.vercel.app
NODE_ENV=production
```

---

### Frontend (.env.local)

```
NEXT_PUBLIC_API_URL=https://personal-book-manager-h60e.onrender.com
```

---

## 🧑‍💻 Local Development Setup

### 1️⃣ Clone Repository

```
git clone https://github.com/8309h/personal-book-manager.git
cd personal-book-manager
```

---

### 2️⃣ Setup Backend

```
cd backend
npm install
npm run dev
```

Backend runs on:

```
http://localhost:5000
```

---

### 3️⃣ Setup Frontend

```
cd frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:3000
```

---

## 🔐 Authentication Flow

1. User signs up or logs in.
2. Backend generates a JWT.
3. JWT is stored in an HttpOnly secure cookie.
4. Protected routes validate the token via middleware.
5. Unauthorized users are redirected to the login page.

---

