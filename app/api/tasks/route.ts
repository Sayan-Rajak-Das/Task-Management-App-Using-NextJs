import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Task from "@/models/Task";

// GET all tasks
export async function GET() {
  await dbConnect();
  const tasks = await Task.find({});
  return NextResponse.json(tasks);
}

// POST a new task
export async function POST(req: Request) {
  await dbConnect();
  const { title, description, dueDate } = await req.json();
  const newTask = await Task.create({ title, description, dueDate });
  return NextResponse.json(newTask);
}

// DELETE a task by ID
export async function DELETE(req: Request) {
  await dbConnect();
  const { id } = await req.json();
  await Task.findByIdAndDelete(id);
  return NextResponse.json({ message: "Task deleted" });
}

// PATCH (Update a task by ID)
export async function PATCH(req: Request) {
  await dbConnect();
  const { id, title, description, dueDate, completed } = await req.json();
  const updatedTask = await Task.findByIdAndUpdate(
    id,
    { title, description, dueDate, completed },
    { new: true }
  );
  return NextResponse.json(updatedTask);
}
