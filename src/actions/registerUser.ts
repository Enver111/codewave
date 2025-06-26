"use server";

import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";

interface RegisterUserPayload {
    email: string;
    name: string;
    password: string;
}

export async function registerUser(payload: RegisterUserPayload) {
  const { email, name, password } = payload;

  if (!email || !name || !password) {
    throw new Error("Missing fields");
  }

  const exist = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (exist) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });

  return user;
}
