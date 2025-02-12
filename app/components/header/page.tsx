import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Header = () => {
  return (
    <div className="flex justify-around my-5">
      <h1 className="text-xl font-bold">Welcome to User Auth</h1>
      <ul className="flex gap-4">
        <li>
          <Link href="/">
            <button>Dashboard</button>
          </Link>
        </li>
        <li>
          <Link href="/login">
            <button>Login</button>
          </Link>
        </li>
        <li>
          <Link href="/register">
            <button>Register</button>
          </Link>
        </li>
        <li>
          <Link href="/logout">
            <button>Logout</button>
          </Link>
        </li>
        <li>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </li>
      </ul>
    </div>
  );
};

export default Header;
