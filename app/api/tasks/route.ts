import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Task from "@/models/Task";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key";

// Middleware to verify JWT
async function verifyToken(req: Request) {
  const token = req.headers.get("authorization")?.split(" ")[1];
  if (!token) return null;
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch {
    return null;
  }
}

// GET all tasks for logged-in user
export async function GET(req: Request) {
  await dbConnect();
  const decoded = await verifyToken(req);
  if (!decoded) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const tasks = await Task.find({ user: decoded.userId });
  return NextResponse.json(tasks);
}

// POST a new task for the logged-in user
export async function POST(req: Request) {
  await dbConnect();
  const decoded = await verifyToken(req);
  if (!decoded) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { title, description, dueDate } = await req.json();
  const newTask = await Task.create({ title, description, dueDate, user: decoded.userId });
  return NextResponse.json(newTask);
}

// DELETE a task
export async function DELETE(req: Request) {
  await dbConnect();
  const decoded = await verifyToken(req);
  if (!decoded) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await req.json();
  await Task.findOneAndDelete({ _id: id, user: decoded.userId });
  return NextResponse.json({ message: "Task deleted" });
}

// UPDATE a task
export async function PATCH(req: Request) {
  await dbConnect();
  const decoded = await verifyToken(req);
  if (!decoded) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id, title, description, dueDate, completed } = await req.json();
  const updatedTask = await Task.findOneAndUpdate(
    { _id: id, user: decoded.userId },
    { title, description, dueDate, completed },
    { new: true }
  );
  return NextResponse.json(updatedTask);
}
