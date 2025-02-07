
# Job Listings Platform

## Overview
This project is a **Job Listings Platform** that allows job seekers to create profiles and search for job listings based on their job titles. Employers can list job opportunities, and recommendations are provided based on matching job titles between job seekers and job listings.

## Features
- User authentication (login, logout, and authorization using JWT)
- Job seeker profile creation
- Job listings by employers
- Search for jobs by title
- Job recommendations based on profile data
- Logout functionality
- Role Based access functionality

## Tech Stack
- **Frontend:** React, React Router, CSS
- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** JWT (JSON Web Token)
- **Deployment:** Netlify (Frontend), Render (Backend)

## Installation

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/abhishek83568/joblistings.git
cd joblistings
```

### 2️⃣ Backend Setup
1. Navigate to the backend directory:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file and add the following:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
  
   ```
4. Start the backend server:
   ```sh
   npm start
   ```

### 3️⃣ Frontend Setup
1. Navigate to the frontend directory:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```

## API Endpoints

### **User Authentication**
- `POST /user/register` - Register a new user
- `POST /user/login` - Login and get JWT token
- `GET /user/logout` - Logout the user

### **Job Seeker**
- `POST /jobSeeker/create-profile` - Create job seeker profile
- `GET /jobSeeker/get-recommendation` - Get recommended jobs based on job title

### **Job Listings**
- `GET /job/get-companies?jobTitle={title}` - Fetch job listings based on job title

## Deployment

### **Frontend Deployment (Netlify)**
1. **Build the project**
   ```sh
   npm run build
   ```
2. **Deploy on Netlify**
   - Upload the `dist` or `build` folder to Netlify
   - Set up a `_redirects` file inside `public/` to handle routing:
     ```
     /* /index.html 200
     ```

### **Backend Deployment (Render)**
1. Push code to GitHub
2. Create a new service on [Render](https://render.com/)
3. Set up environment variables in Render
4. Add build command:
   ```sh
   npm install && npm start
   ```
5. Deploy and get the live backend URL





## Contributors
- **Your Name** - [GitHub](https://github.com/abhishek83568)

