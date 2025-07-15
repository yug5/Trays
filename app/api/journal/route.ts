import { NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/authOptions";

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

  const { searchParams } = new URL(req.url);
  const dateParam = searchParams.get("date");
  if (!dateParam) {
    return NextResponse.json(
      { error: "Date query is required" },
      { status: 400 }
    );
  }

  const requestedDate = new Date(dateParam);
  requestedDate.setHours(0, 0, 0, 0);
  const nextDay = new Date(requestedDate);
  nextDay.setDate(requestedDate.getDate() + 1);

  const existing = await prisma.journal.findFirst({
    where: {
      userId: user.id,
      date: {
        gte: requestedDate,
        lt: nextDay,
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

  const { searchParams } = new URL(req.url);
  const dateParam = searchParams.get("date");

  const targetDate = dateParam ? new Date(dateParam) : new Date();
  targetDate.setHours(0, 0, 0, 0);

  const nextDay = new Date(targetDate);
  nextDay.setDate(targetDate.getDate() + 1);

  const journal = await prisma.journal.findFirst({
    where: {
      userId: user.id,
      date: {
        gte: targetDate,
        lt: nextDay,
      },
    },
  });

  return NextResponse.json({ journal });
}
