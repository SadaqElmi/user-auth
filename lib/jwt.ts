import jwt from "jsonwebtoken";

// Define a fallback secret key in case `process.env.SECRET_KEY` is not set
const SECRET_KEY = process.env.SECRET_KEY || "Sadaa";

// Generate a JWT token
const generateToken = (id: string): string => {
  return jwt.sign({ id }, SECRET_KEY, { expiresIn: "10m" });
};

export { generateToken };
