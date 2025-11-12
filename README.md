# Task Planet Mini Social Post Application  
_A Full Stack Social Feed App built for Internship Skill Evaluation_

## 📌 Overview
This project is a **Mini Social Post Application** inspired by the **TaskPlanet Social Page**.  
Users can **sign up, log in, create posts (text or image)**, view a public feed, and interact by **liking and commenting** on posts.

It demonstrates a complete **MERN stack** implementation with **secure JWT authentication**, **MongoDB persistence**, and a **modern, responsive UI** styled similar to TaskPlanet’s design.

---

## 🚀 Features

### 👤 Authentication
- Register and Login with Email + Password  
- JWT-based authentication stored in cookies  
- Protected routes (both frontend & backend)  
- Auto-redirect to login if not authenticated  

### 📝 Post Management
- Create post with **text and/or image (Cloudinary upload)**  
- Image upload with **Cloudinary** + preview + progress  
- View all posts in a feed (paginated)  
- Instant UI update when a new post is created  

### ❤️ Like & Comment
- Like or unlike posts in real-time  
- Add and view comments on posts  
- Display total likes and comments count  

### 🖼️ UI/UX
- Fully responsive **React frontend** (pure CSS, no Tailwind/MUI)  
- TaskPlanet-inspired feed layout  
- Toast notifications for success/error  
- Loading and error states  
- Font: *Lato* for text, *system-ui* for placeholders  

### ⚙️ Backend API
- RESTful Express.js API  
- Protected routes using JWT middleware  
- MongoDB with Mongoose models (`User`, `Post`)  
- Pagination support for posts (`/api/posts?page=1&limit=5`)  
- Error handling via centralized middleware  


## 🧩 Tech Stack

### Frontend
- React.js (Vite)
- Axios
- React Router DOM
- React Hot Toast
- Pure CSS (no Tailwind or MUI)
- Cloudinary (image upload)
- React Icons

### Backend
- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication
- Bcrypt for password hashing
- CORS, Cookie-Parser, dotenv
- Deployed on Render


## 🗂️ Project Structure

### 📁 Backend
```
backend/
│
├── controllers/
│   ├── auth.controller.js
│   └── post.controller.js
│
├── routes/
│   ├── auth.route.js
│   └── post.route.js
│
├── models/
│   ├── user.model.js
│   └── post.model.js
│
├── middleware/
│   └── verifyTokens.js
│
├── lib/
│   ├── createError.js
│   ├── db.js
│   └── rateLimiter.js
│
└── app.js
<<<<<<< HEAD


=======
```
>>>>>>> dee47d52c81c45b4146a51f50e995131ee9c3498

### 📁 Frontend
```
frontend/
│
├── src/
│   ├── components/
│   │   ├── CreatePost/
│   │   └── PostCard/
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── routes/
│   │   ├── Login/
│   │   ├── Register/
│   │   ├── Feed/
│   │   └── ProtectedRoute/
│   ├── lib/
│   │   ├── apiRequest.js
│   │   └── uploadFile.js
│   ├── utils/
│   │   └── formatDateTime.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
```

---

## ⚙️ Installation & Setup

### 🔧 Prerequisites
- Node.js (v18+)
- MongoDB Atlas account
- Cloudinary account
- Git

---

### 🖥️ Backend Setup

```bash
git clone https://github.com/sadikhal/task-planet.git
cd task-planet/backend
npm install
```

Create a `.env` file:
```env
MONGO_URL=your_mongodb_connection_string
JWT_KEY=your_jwt_secret
CLIENT_URL=http://localhost:5173
PORT=3002
```

Run the backend:
```bash
node app.js
```

Backend runs at: **http://localhost:3002**

---

### 💻 Frontend Setup

```bash
cd ../frontend
npm install
```

Create `.env` file:
```env
VITE_BASE_URL=http://localhost:3002/api
VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_unsigned_preset
```

Run the frontend:
```bash
npm run dev
```

Frontend runs at: **http://localhost:5173**

---

## ☁️ Deployment

- **Frontend** → [Vercel](https://vercel.com) / [Netlify](https://netlify.com)
- **Backend** → [Render](https://render.com)
- **Database** → [MongoDB Atlas](https://www.mongodb.com/atlas/database)
- **Images** → [Cloudinary](https://cloudinary.com)

Ensure backend CORS:
```js
origin: [process.env.CLIENT_URL],
credentials: true,
```

---

## 🧪 API Endpoints

| Method | Endpoint                    | Description               | Protected |
| :----- | :-------------------------- | :------------------------ | :-------- |
| POST   | `/api/auth/register`        | Register new user         | ❌ |
| POST   | `/api/auth/login`           | Login user                | ❌ |
| POST   | `/api/auth/logout`          | Logout user               | ✅ |
| GET    | `/api/posts?page=1&limit=5` | Get all posts (paginated) | ✅ |
| POST   | `/api/posts`                | Create new post           | ✅ |
| PUT    | `/api/posts/:id/like`       | Like/Unlike post          | ✅ |
| POST   | `/api/posts/:id/comment`    | Add comment               | ✅ |

---

## 🎨 UI Design Inspiration

Inspired by **TaskPlanet App’s Social Page** — modern, clean, and minimal:
- Blue-white color palette
- Rounded cards & buttons
- Consistent spacing and shadows
- Font family: **Lato**
- Placeholder font: **system-ui, apple-system, Segoe UI**

---

## 🧠 Learning Highlights
- Full MERN stack workflow (React + Node + MongoDB)
- JWT cookie-based authentication
- REST API integration with frontend
- Cloudinary image upload with progress
- Pagination in both frontend & backend
- Error handling & toast notifications
- Clean modular project structure

---

## ✨ Author
**Sadikhali P V**  
Full Stack Developer – Calicut, Kerala  
📧 [@sadikhalikvr.com](mailto:sadikhalikvr@gmail.com)  
🌐 [LinkedIn](https://www.linkedin.com/in/sadikhali-p-v-6aa76722a/) | [GitHub](https://github.com/sadikhal)


## 🏁 License
This project is open-source and available under the **MIT License**.

---

### ⭐ If you like this project, don’t forget to give it a **star** on GitHub!
```
