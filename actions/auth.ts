"use server";

import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { handleError } from "./utils/helpers";

// import {
//   compileActivationTemplate,
//   compileResetPassTemplate,
//   sendMail,
// } from "../mail";
// import { signJwt, verifyJwt } from "../jwt";

export async function userRegister(
  login: string,
  password: string,
  confirm: string
) {
  return handleError(async () => {
    if (!login || !password || !confirm) {
      return { message: "Login and password are required.", status: "error" };
    }

    if (password !== confirm) {
      return { confirm: false, status: "error" };
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: login },
    });

    if (existingUser) {
      return {
        status: "error",
        message: "User with this email already exists.",
      };
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

    return {
      message: `User ${user?.email} registered successfully!`,
      status: "success",
    };
  });
}
