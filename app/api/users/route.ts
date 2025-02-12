import User from "@/app/models/userModel";
import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

//get all users
export async function GET() {
  await connectDB();
  const users = await User.find({});
  return NextResponse.json(users);
}

//create User

export async function POST(request: Request) {
  await connectDB();
  try {
    const { name, email, password } = await request.json();

    // Validate data
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const findUser = await User.findOne({
      $or: [{ name }, { email }],
    });
    if (findUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    const user = await User.create({ name, email, password });
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
