"use client";

import { useState } from "react";
import { toast } from "react-toastify";

// Define the structure of a Task object
interface Task {
  _id: string; 
  title: string;
  description: string;
  dueDate: string;
}

interface TaskListProps {
  tasks: Task[]; // Array of tasks passed from parent
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>; // Function to update the tasks list
  token: string; // Authentication token
}

export default function TaskList({ tasks, setTasks, token }: TaskListProps) {
  const [editingTask, setEditingTask] = useState<Task | null>(null); // Task being edited
  const [newTitle, setNewTitle] = useState(""); // Updated title for the task
  const [newDescription, setNewDescription] = useState(""); // Updated description for the task
  const [newDueDate, setNewDueDate] = useState("");


  const deleteTask = async (id: string) => {
    try {
      const res = await fetch("/api/tasks", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Pass JWT token
        },
        body: JSON.stringify({ id }),
      });
  
      if (res.ok) {
        setTasks(tasks.filter((task) => task._id !== id));
        toast.success("Task deleted successfully!"); 
      } else {
        const errorData = await res.json();
        toast.error(errorData.error || "Failed to delete the task."); 
      }
    } catch (error: any) {
      toast.error("An error occurred while deleting the task. Please try again.");
    }
  };
  

  // Start editing a task
  const startEditing = (task: Task) => {
    setEditingTask(task);
    setNewTitle(task.title);
    setNewDescription(task.description);
    setNewDueDate(task.dueDate);
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingTask(null);
    setNewTitle("");
    setNewDescription("");
    setNewDueDate("");
  };

  const updateTask = async () => {
    if (!editingTask) {
      toast.error("No task is currently being edited.");
      return;
    }
  
    const updatedTask = {
      id: editingTask._id,
      title: newTitle,
      description: newDescription,
      dueDate: newDueDate,
    };
  
    try {
      const res = await fetch("/api/tasks", {
        method: "PATCH",
        body: JSON.stringify(updatedTask),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,     // Pass JWT token
        },
      });
  
      if (res.ok) {
        setTasks(
          tasks.map((task) =>
            task._id === editingTask._id
              ? { ...task, title: newTitle, description: newDescription, dueDate: newDueDate }
              : task
          )
        );
        toast.success("Task updated successfully!"); // Success message
        cancelEditing();
      } else {
        const errorData = await res.json();
        toast.error(errorData.error || "Failed to update the task."); 
      }
    } catch (error: any) {
      console.error("Error updating task:", error);
      toast.error("An error occurred while updating the task. Please try again.");
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Task List</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="bg-gradient-to-r from-green-100 to-blue-100 p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300"
          >
            {editingTask && editingTask._id === task._id ? (
              <div>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full p-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <textarea
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full p-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  type="date"
                  value={new Date(newDueDate).toISOString().split("T")[0]}
                  onChange={(e) => setNewDueDate(e.target.value)}
                  className="w-full p-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <div className="flex justify-between">
                  <button
                    onClick={updateTask}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEditing}
                    className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{task.title}</h3>
                <p className="text-gray-700 mb-4">{task.description}</p>
                <p className="text-gray-600 text-sm mb-4">
                  <strong>Due:</strong>{" "}
                  {new Date(task.dueDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>

                <div className="flex space-x-3 mt-4">
                  <button
                    onClick={() => startEditing(task)}
                    className="px-3 py-2 bg-yellow-400 text-white rounded-md hover:bg-yellow-500 transition duration-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTask(task._id)}
                    className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
