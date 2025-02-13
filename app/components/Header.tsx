"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { getCookie, deleteCookie } from "cookies-next";

interface DecodedToken {
  id: string;
  role: string;
  exp: number;
}

const Header = () => {
  const [image, setImage] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>("user");

  function decodeToken(token: string) {
    try {
      const payloadBase64 = token.split(".")[1];
      const decodedPayload = atob(payloadBase64);
      return JSON.parse(decodedPayload);
    } catch (error) {
      console.error("Invalid token", error);
      return null;
    }
  }

  useEffect(() => {
    const token = getCookie("token");
    if (token) {
      const decoded = decodeToken(token as string);
      if (decoded) {
        setRole(decoded.role);
        setUserId(decoded.id);
      }
    }
  }, []);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !userId) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", userId);

    try {
      const res = await axios.post("/api/upload", formData);
      setImage(res.data.imageUrl); // Set the image from the response
    } catch (error) {
      console.error("Upload failed", error);
    }
  };

  const handleLogout = () => {
    deleteCookie("token");
    setRole(null);
    setUserId(null);
    setImage(null);
    window.location.href = "/login";
  };

  return (
    <div className="flex justify-around my-5">
      <h1 className="text-xl font-bold">Welcome to User Auth</h1>
      <ul className="flex gap-4 items-center">
        {role && (
          <>
            <li>
              <Link href="/">
                <Button variant="outline">Dashboard</Button>
              </Link>
            </li>
            <li>
              <Link href="#">
                <Button variant="outline">Profile</Button>
              </Link>
            </li>
            <li>
              <Button variant="destructive" onClick={handleLogout}>
                Logout
              </Button>
            </li>
            <li className="flex gap-4 items-center">
              <Avatar>
                <AvatarImage
                  src={image || "https://github.com/shadcn.png"}
                  alt="Profile"
                  className="object-cover"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <input type="file" onChange={handleImageChange} />
            </li>
            {role === "admin" && (
              <li>
                <Link href="/admin">
                  <Button variant="outline">Admin Panel</Button>
                </Link>
              </li>
            )}
          </>
        )}
        {!role && (
          <>
            <li>
              <Link href="/login">
                <Button variant="outline">Login</Button>
              </Link>
            </li>
            <li>
              <Link href="/register">
                <Button variant="outline">Register</Button>
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Header;
