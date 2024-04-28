"use server";

import { User } from "@prisma/client";
import * as bcrypt from "bcrypt";
// import {
//   compileActivationTemplate,
//   compileResetPassTemplate,
//   sendMail,
// } from "../mail";
// import { signJwt, verifyJwt } from "../jwt";
import { prisma } from "@/lib/prisma";

export async function registerUser(
  user: Omit<User, "id" | "emailVerified" | "image">
) {
  const result = await prisma.user.create({
    data: {
      firstName: "",
      lastName: "",
      email: user.login,
      password: await bcrypt.hash(user.password, 10),
    },
  });

  //   const jwtUserId = signJwt({
  //     id: result.id,
  //   });
  //   const activationUrl = `${process.env.NEXTAUTH_URL}/auth/activation/${jwtUserId}`;
  //   const body = compileActivationTemplate(user.firstName, activationUrl);
  //   await sendMail({ to: user.email, subject: "Activate Your Account", body });
  return result;
}
