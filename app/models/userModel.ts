import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";

export interface User extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  profileImage?: string;
  token?: string;
}

const userSchema: Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // ✅ Fix typo (was "requied")
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  },
  profileImage: {
    type: String,
  },
});

// ✅ Hash password before saving
userSchema.pre("save", async function (next) {
  const user = this as any; // ✅ Fix TypeScript issue

  if (!user.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  next();
});
const User = mongoose.models.User || mongoose.model<User>("User", userSchema);
export default User;
