import { NextResponse } from "next/server";
import { db } from "./../../../../lib/db";
import { users } from "./../../../../lib/schema/user";
import { hashPassword } from "./../../../../lib/utils/auth";
import { eq } from "drizzle-orm";


export async function POST(req: Request) {
    try {
      const { firstName, lastName, email, password, phoneNumber } = await req.json();
  
      if (!firstName || !lastName || !email || !password || !phoneNumber) {
        return NextResponse.json({ error: "All fields are required" }, { status: 400 });
      }
  
      const existingUser = await db.select().from(users).where(eq(users.email, email));
      if (existingUser.length > 0) {
        return NextResponse.json({ error: "Email already exists" }, { status: 400 });
      }
  
      const hashedPassword = await hashPassword(password);
  
      const newUser = await db
        .insert(users)
        .values({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim().toLowerCase(),
          password: hashedPassword,
          phoneNumber: phoneNumber.trim(),
        })
        .returning();
  
      return NextResponse.json({
        message: "User registered successfully!",
        user: newUser[0],
      });
    } catch (err) {
      console.error(err);
      return NextResponse.json({ error: "Failed to register user" }, { status: 500 });
    }
  }
  
