
# Task Management Application

## Overview
A web-based platform built with **Next.js** for managing tasks. It allows users to create, view, edit, and delete tasks with persistence via **MongoDB**. The app integrates **user authentication**, **JWT tokens**, and **session management** to ensure users can only view their tasks.

## Features
- **Add Tasks**: Create tasks with title, description, and due date.
- **View Tasks**: Display a list of tasks for the authenticated user.
- **Update Tasks**: Edit task details and mark as completed.
- **Delete Tasks**: Remove unwanted tasks.
- **User Authentication**: Login/registration using **JWT** and **bcrypt** for password hashing.
- **Responsive Design**: Built with **TailwindCSS** for a clean UI.
- **Toast Notifications**: User-friendly notifications with **React-Toastify**.

## Technologies Used
- **Frontend**: Next.js, TailwindCSS, React-Toastify
- **Backend**: Next.js API Routes, MongoDB, JWT Tokens, bcrypt
- **Deployment**: Vercel

### Prerequisites:
- **Node.js** (v14 or higher)
- **MongoDB** (local or cloud)
- **Vercel Account** (for deployment)

### Steps:
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Sayan-Rajak-Das/Task-Management-App-Using-NextJs.git
   cd task-manager-using-nextjs
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   - Create `.env.local` and add:
     ```
     MONGODB_URI=your-mongodb-connection-string
     JWT_SECRET=your-secret-key
     ```

4. **Run the Application Locally**:
   ```bash
   npm run dev
   ```
   Access the app at: [http://localhost:3000](http://localhost:3000)

## Links
- **Vercel Deployment**: [https://task-management-app-using-next-js.vercel.app/](https://task-management-app-using-next-js.vercel.app/login)
- **Full Documentation**: [Documentation Link](https://github.com/Sayan-Rajak-Das/Task-Management-App-Using-NextJs/blob/master/Task%20Management%20Application%20Documentation.pdf.pdf)

---
