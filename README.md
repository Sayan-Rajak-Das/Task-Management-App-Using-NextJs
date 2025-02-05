Here’s the complete and well-structured `README.md` file for your **Task Management Application**:

---

# **Task Management Application**

A simple and intuitive task management application built using **Next.js** with **Server Actions** for managing tasks effectively. This project supports full CRUD operations, allowing users to create, view, edit, and delete tasks with data persistence via MongoDB.

---

## **Features**

- **Task Operations**:
  - Create, read, update, and delete tasks.
- **Responsive Design**:
  - Fully responsive and optimized for all screen sizes.

---

## **Technologies Used**

- **Frontend**:  
  - [Next.js](https://nextjs.org/) (Latest version)
  - [TailwindCSS](https://tailwindcss.com/) for styling

- **Backend**:  
  - Next.js Server Actions for server-side logic

- **Database**:  
  - [MongoDB](https://www.mongodb.com/) for data persistence

- **Deployment**:  
  - [Vercel](https://vercel.com/) for hosting the application

---

## **Live Demo**

- **Live Application**: [Task Management App](https://task-management-app-using-next-js.vercel.app/)

---

## **Setup Instructions**

### **Prerequisites**
- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (Local or Cloud instance)
- [Git](https://git-scm.com/)

### **Step 1: Clone the Repository**
```bash
git clone https://github.com/Sayan-Rajak-Das/Task-Management-App-Using-NextJs.git
cd Task-Management-App-Using-NextJs
```

### **Step 2: Install Dependencies**
```bash
npm install
```

### **Step 3: Configure Environment Variables**
Create a `.env.local` file in the root directory and add the following:
```
MONGODB_URI=<Your MongoDB Connection String>
```

### **Step 4: Run the Application**
To start the application in development mode:
```bash
npm run dev
```
- Open your browser and navigate to `http://localhost:3000`.

### **Step 5: Build for Production**
To create an optimized production build:
```bash
npm run build
npm start
```

---

## **Deployment**

The application is deployed on Vercel. Follow these steps for deployment:

1. Push your code to a GitHub repository.
2. Log in to [Vercel](https://vercel.com/) and import your GitHub repository.
3. Set the **environment variables** in Vercel:
   ```
   MONGODB_URI=<Your MongoDB Connection String>
   ```
4. Trigger a deployment and access the live URL provided by Vercel.

---

## **API Endpoints**

### **Base URL**: `/api/tasks`

1. **GET** `/api/tasks`  
   Fetch all tasks.

   **Response**:
   ```json
   [
     {
       "_id": "task-id",
       "title": "Task Title",
       "description": "Task Description",
       "dueDate": "2025-02-10T00:00:00.000Z",
       "completed": false
     }
   ]
   ```

2. **POST** `/api/tasks`  
   Create a new task.

   **Request**:
   ```json
   {
     "title": "New Task",
     "description": "Task Description",
     "dueDate": "2025-02-10"
   }
   ```

3. **PATCH** `/api/tasks`  
   Update an existing task.

   **Request**:
   ```json
   {
     "id": "task-id",
     "title": "Updated Task Title",
     "description": "Updated Task Description",
     "completed": true
   }
   ```

4. **DELETE** `/api/tasks`  
   Delete a task.

   **Request**:
   ```json
   {
     "id": "task-id"
   }
   ```

---

## **Known Issues**
- Ensure your MongoDB connection string is valid.
- Currently, there is no authentication mechanism.

---

## **Future Improvements**
- Add user authentication for personalized task management.
- Introduce drag-and-drop functionality for task prioritization.
- Enhance the UI with animations and additional features.

---

