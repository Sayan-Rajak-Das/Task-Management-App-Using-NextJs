// TaskForm.tsx 
"use client";

import { useState } from "react";

interface TaskFormProps {
  addTask: (newTask: any) => void;              // Callback to pass the new task to TaskList
}

export default function TaskForm({ addTask }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newTask = { title, description, dueDate };

    const response = await fetch("/api/tasks", {
      method: "POST",
      body: JSON.stringify(newTask),
    });

    if (response.ok) {
      const createdTask = await response.json();
      addTask(createdTask); // Add the new task to the task list
    }

    // Clear the form and close the modal
    setTitle("");
    setDescription("");
    setDueDate("");
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div
      className="flex items-center justify-center h-auto w-auto"
      style={{ backgroundColor: "transparent" }}
    >
      <button
        onClick={openModal}
        className="px-6 py-3 border-4 border-green-600 text-green-600 font-bold rounded-full shadow-md hover:bg-green-600 hover:text-white transition duration-300"
      >
        Add Task
      </button>
  
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 text-gray-800 rounded-lg shadow-xl w-full max-w-lg p-6 relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-full"
              aria-label="Close modal"
            >
              ✖
            </button>
            <h2 className="text-3xl font-bold text-center mb-6">Create a Task</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-800 mb-2"
                >
                  Task Title
                </label>
                <input
                  type="text"
                  id="title"
                  placeholder="Enter task title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full p-3 rounded-lg border border-gray-300 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-800 mb-2"
                >
                  Task Description
                </label>
                <textarea
                  id="description"
                  placeholder="Enter task description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-3 rounded-lg border border-gray-300 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="dueDate"
                  className="block text-sm font-medium text-gray-800 mb-2"
                >
                  Due Date
                </label>
                <input
                  type="date"
                  id="dueDate"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full p-3 rounded-lg border border-gray-300 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
              <div className="flex justify-between items-center mt-6">
                <button
                  type="submit"
                  className="px-6 py-3 bg-yellow-400 text-gray-800 font-bold rounded-full shadow-lg hover:bg-yellow-500 transition duration-300"
                >
                  Add Task
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-3 bg-red-400 text-white font-bold rounded-full shadow-lg hover:bg-red-500 transition duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
  
}