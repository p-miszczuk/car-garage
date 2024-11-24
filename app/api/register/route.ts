import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

// import {
//   compileActivationTemplate,
//   compileResetPassTemplate,
//   sendMail,
// } from "../mail";
// import { signJwt, verifyJwt } from "../jwt";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { login, password } = data;

    if (!login || !password) {
      return NextResponse.json(
        { message: "Login and password are required." },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: login },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User with this email already exists." },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email: login,
        password: hashedPassword,
        firstName: "",
        lastName: "",
      },
    });

    //   const jwtUserId = signJwt({
    //     id: result.id,
    //   });
    //   const activationUrl = `${process.env.NEXTAUTH_URL}/auth/activation/${jwtUserId}`;
    //   const body = compileActivationTemplate(user.firstName, activationUrl);
    //   await sendMail({ to: user.email, subject: "Activate Your Account", body });

    return NextResponse.json(
      { message: "User registered successfully!" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error registering user", error: (error as Error).message },
      { status: 500 }
    );
  }
}
