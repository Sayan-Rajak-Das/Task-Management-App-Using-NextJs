"use client";
import { useState, useEffect } from "react";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import { BeatLoader } from "react-spinners"; // Import loader

export default function Task({token}: any) {
  const [tasks, setTasks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  // Fetch the tasks from the API
  useEffect(() => {    
    fetch("/api/tasks", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
        console.log("Tasks fetched:", data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
        setIsLoading(false);
      });
    
  }, [token]);

  const addTask = (newTask: any) => {
    setTasks((prevTasks) => [...prevTasks, newTask]); // Update the task list with the new task
  };

  console.log("Loading state:", isLoading);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-white to-blue-100">
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Task Management App
        </h1>
        <div className="shadow-lg rounded-lg p-6 bg-transparent">
          <TaskForm addTask={addTask} token={token}  />
        </div>
        <div className="mt-8">
          {isLoading ? ( // Show loader while loading
            <div className="flex justify-center items-center py-12 bg-gray-200">
              <BeatLoader color="#4A90E2" size={15} />
              <p className="ml-4">Loading tasks...</p>
            </div>
          ) : (
            <TaskList tasks={tasks} setTasks={setTasks} token={token} />
          )}
        </div>
      </div>
    </div>
  );
}
