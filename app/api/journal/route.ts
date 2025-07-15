import { NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { content, mood } = await req.json();

  if (!content) {
    return NextResponse.json({ error: "Content required" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const existing = await prisma.journal.findFirst({
    where: {
      userId: user.id,
      date: {
        gte: today,
        lt: new Date(today.getTime() + 86400000),
      },
    },
  });

  let journal;
  if (existing) {
    journal = await prisma.journal.update({
      where: { id: existing.id },
      data: { content, mood },
    });
  } else {
    journal = await prisma.journal.create({
      data: {
        userId: user.id,
        content,
        mood,
      },
    });
  }

  return NextResponse.json({ journal });
}
export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const journal = await prisma.journal.findFirst({
    where: {
      userId: user.id,
      date: {
        gte: today,
        lt: new Date(today.getTime() + 86400000), // today < date < tomorrow
      },
    },
  });

  return NextResponse.json({ journal });
}
