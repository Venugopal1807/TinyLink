import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const links = await prisma.link.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json(links);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch links' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { url, shortCode } = body;

    if (shortCode && !/^[A-Za-z0-9]{6,8}$/.test(shortCode)) {
      return NextResponse.json({ error: 'Code must be 6-8 alphanumeric characters.' }, { status: 400 });
    }

    try { new URL(url); } catch (_) {
      return NextResponse.json({ error: 'Invalid URL format.' }, { status: 400 });
    }

    const existing = await prisma.link.findUnique({ where: { shortCode } });
    if (existing) return NextResponse.json({ error: 'Short code already exists.' }, { status: 409 });

    const newLink = await prisma.link.create({ data: { originalUrl: url, shortCode } });
    return NextResponse.json(newLink, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}