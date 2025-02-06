"use client";

import { useState } from "react";
import { toast } from "react-toastify";

interface TaskFormProps {
  addTask: (newTask: any) => void;
  token: string;
}

export default function TaskForm({ addTask, token }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);   // Loading state for form submission
  const [isClosing, setIsClosing] = useState(false);         // Loading state for cancel button

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true); 

    const newTask = { title, description, dueDate };

    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newTask),
      });

      if (response.ok) {
        const createdTask = await response.json();
        addTask(createdTask);
        toast.success("Task added successfully!");

        // Clear the form and close the modal
        setTitle("");
        setDescription("");
        setDueDate("");
        setIsModalOpen(false);
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Failed to add the task.");
      }
    } catch (error: any) {
      toast.error("An error occurred while adding the task. Please try again.");
    } finally {
      setIsSubmitting(false);    
    }
  };

  const handleClose = () => {
    setIsClosing(true); 
    setTimeout(() => {
      setIsModalOpen(false);
      setIsClosing(false); 
    }, 300);                         // Simulate a smooth closing effect
  };

  return (
    <div className="flex items-center justify-center h-auto w-auto">
      {/* Add Task Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-6 py-3 border-4 border-green-600 text-green-600 font-bold rounded-full shadow-md hover:bg-green-600 hover:text-white transition duration-300 flex items-center justify-center"
      >
        Add Task
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 text-gray-800 rounded-lg shadow-xl w-full max-w-lg p-6 relative">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-full"
              aria-label="Close modal"
              disabled={isClosing}
            >
              ✖
            </button>
            <h2 className="text-3xl font-bold text-center mb-6">Create a Task</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-800 mb-2">
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
                <label htmlFor="description" className="block text-sm font-medium text-gray-800 mb-2">
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
                <label htmlFor="dueDate" className="block text-sm font-medium text-gray-800 mb-2">
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
                {/* Add Task Button with Separate Spinner */}
                <button
                  type="submit"
                  className="px-6 py-3 bg-yellow-400 text-gray-800 font-bold rounded-full shadow-lg hover:bg-yellow-500 transition duration-300 flex items-center justify-center"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="w-5 h-5 border-2 border-gray-800 border-t-transparent border-solid rounded-full animate-spin"></span>
                  ) : (
                    "Add Task"
                  )}
                </button>

                {/* Cancel Button with Separate Spinner */}
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-6 py-3 bg-red-400 text-white font-bold rounded-full shadow-lg hover:bg-red-500 transition duration-300 flex items-center justify-center"
                  disabled={isClosing}
                >
                  {isClosing ? (
                    <span className="w-5 h-5 border-2 border-white border-t-transparent border-solid rounded-full animate-spin"></span>
                  ) : (
                    "Cancel"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
