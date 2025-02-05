// Task.tsx

"use client";
import { useState, useEffect } from "react";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";

export default function Task() {
  const [tasks, setTasks] = useState<any[]>([]);

  // Fetch the tasks from the API
  useEffect(() => {
    fetch("/api/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  const addTask = (newTask: any) => {
    setTasks((prevTasks) => [...prevTasks, newTask]); // Update the task list with the new task
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-white to-blue-100">
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Task Management App
        </h1>
        {/* Fixed the white background here */}
        <div className="shadow-lg rounded-lg p-6 bg-transparent">
          <TaskForm addTask={addTask} />
        </div>
        <div className="mt-8">
          <TaskList tasks={tasks} setTasks={setTasks} />
        </div>
      </div>
    </div>
  );
}
