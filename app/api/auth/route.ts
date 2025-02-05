import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key";

// User Registration
export async function POST(req: Request) {
  await dbConnect();
  const { username, password } = await req.json();

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  const newUser = new User({ username, password });
  await newUser.save();
  return NextResponse.json({ message: "User registered successfully" });
}

// User Login
export async function PATCH(req: Request) {
  await dbConnect();
  const { username, password } = await req.json();

  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: "1h" });

  return NextResponse.json({ token });
}
