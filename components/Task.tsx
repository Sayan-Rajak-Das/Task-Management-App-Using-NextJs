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
    <>
      <TaskForm addTask={addTask} />
      <TaskList tasks={tasks} setTasks={setTasks} />
    </>
  );
}
