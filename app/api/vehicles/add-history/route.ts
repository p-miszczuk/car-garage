import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

const prisma = new PrismaClient();

interface SessionUser {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

interface Session {
  user?: SessionUser | null;
}

export async function POST(
  req: NextRequest & { headers: Record<string, string> },
  res: NextResponse
) {
  try {
    const session = (await getServerSession(authOptions)) as unknown as Session;

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const fields = await req.json();

    const data = await prisma.reminder.create({
      data: {
        ...fields,
        date: new Date(),
      },
    });

    if (!data?.id) throw new Error("An unexpected error occurred");

    return NextResponse.json(
      { status: "success", message: "The vehicle history item has been added" },
      { status: 201 }
    );
  } catch (error: any) {
    console.log("🚀 ~ error:", error);
    return NextResponse.json(
      { message: error?.message || "An unexpected error occurred" },
      { status: 401 }
    );
  }
}
