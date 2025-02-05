"use client";

import { useState } from "react";

// Define the structure of a Task object
interface Task {
  _id: string; // MongoDB Object ID
  title: string;
  description: string;
}

interface TaskListProps {
  tasks: Task[]; // Array of tasks passed from parent
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>; // Function to update the tasks list
}

export default function TaskList({ tasks, setTasks }: TaskListProps) {
  const [editingTask, setEditingTask] = useState<Task | null>(null); // Task being edited
  const [newTitle, setNewTitle] = useState(""); // Updated title for the task
  const [newDescription, setNewDescription] = useState(""); // Updated description for the task

  // Delete a task
  const deleteTask = async (id: string) => {
    try {
      const res = await fetch("/api/tasks", {
        method: "DELETE",
        body: JSON.stringify({ id }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        setTasks(tasks.filter((task) => task._id !== id));
      } else {
        console.error("Failed to delete the task.");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Start editing a task
  const startEditing = (task: Task) => {
    setEditingTask(task);
    setNewTitle(task.title);
    setNewDescription(task.description);
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingTask(null);
    setNewTitle("");
    setNewDescription("");
  };

  // Update a task
  const updateTask = async () => {
    if (!editingTask) {
      console.error("No task is currently being edited.");
      return;
    }

    const updatedTask = {
      id: editingTask._id,
      title: newTitle,
      description: newDescription,
    };

    try {
      const res = await fetch("/api/tasks", {
        method: "PATCH",
        body: JSON.stringify(updatedTask),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        setTasks(
          tasks.map((task) =>
            task._id === editingTask._id
              ? { ...task, title: newTitle, description: newDescription }
              : task
          )
        );
        cancelEditing();
      } else {
        console.error("Failed to update the task.");
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Task List</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task._id} className="mb-4 p-4 border-b border-gray-200">
            {editingTask && editingTask._id === task._id ? (
              <div>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full p-3 mb-2 border border-gray-300 rounded-md"
                />
                <textarea
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full p-3 mb-2 border border-gray-300 rounded-md"
                />
                <div className="flex justify-between">
                  <button
                    onClick={updateTask}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEditing}
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-xl font-medium text-gray-800">
                  {task.title}
                </h3>
                <p className="text-gray-600 mt-2">{task.description}</p>
                <div className="mt-3 flex space-x-2">
                  <button
                    onClick={() => startEditing(task)}
                    className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTask(task._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
