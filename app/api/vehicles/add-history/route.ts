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
  req: NextRequest & { headers: Record<string, string> }
) {
  try {
    const session = (await getServerSession(authOptions)) as unknown as Session;

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { selectedOption, ...rest } = await req.json();
    const values = {
      data: {
        ...rest,
        date: new Date().toISOString(),
      },
    };

    const modelMap: Record<string, { create: (values: any) => Promise<any> }> =
      {
        reminder: prisma.reminder,
        route: prisma.route,
        service: prisma.service,
        expense: prisma.expense,
        refuel: prisma.refuel,
        fines: prisma.fines,
      };
    const data = await modelMap[selectedOption].create(values);

    if (!data || !("id" in data && data.id))
      throw new Error("An unexpected error occurred");

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
