// TaskList.tsx 
"use client";

import { useEffect, useState } from "react";


interface TaskListProps {
  tasks: any[]; // tasks passed from parent
  setTasks: React.Dispatch<React.SetStateAction<any[]>>; // function to update the tasks list
}


export default function TaskList({ tasks, setTasks }: TaskListProps) {
  // const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");


  const deleteTask = async (id: string) => {
    await fetch("/api/tasks", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });
    setTasks(tasks.filter((task: any) => task._id !== id));
  };

  const startEditing = (task: any) => {
    setEditingTask(task);
    setNewTitle(task.title);
    setNewDescription(task.description);
  };

  const cancelEditing = () => {
    setEditingTask(null);
    setNewTitle("");
    setNewDescription("");
  };

  const updateTask = async () => {
    const updatedTask = {
      id: editingTask._id,
      title: newTitle,
      description: newDescription,
    };
    const res = await fetch("/api/tasks", {
      method: "PATCH",
      body: JSON.stringify(updatedTask),
    });

    if (res.ok) {
      setTasks(tasks.map((task: any) => (task._id === editingTask._id ? { ...task, title: newTitle, description: newDescription } : task)));
      cancelEditing();
    } else {
      // Handle error (e.g., show an error message)
      console.error("Error updating task");
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Task List</h2>
      <ul>
        {tasks.map((task: any) => (
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
                <h3 className="text-xl font-medium text-gray-800">{task.title}</h3>
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
