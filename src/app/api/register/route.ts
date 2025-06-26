import { NextResponse } from "next/server";
import { registerUser } from "@/actions/registerUser";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const user = await registerUser(body);
    return NextResponse.json(user);
  } catch (error: any) {
    console.log("REGISTRATION_ERROR", error);
    if (error.message === "Email already exists") {
      return new NextResponse(error.message, { status: 409 });
    }
     if (error.message === "Missing fields") {
      return new NextResponse(error.message, { status: 400 });
    }
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
