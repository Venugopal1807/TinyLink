import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET Single Link (Required for automated testing)
export async function GET(request: Request, { params }: { params: { code: string } }) {
  const link = await prisma.link.findUnique({
    where: { shortCode: params.code }
  });
  
  if (!link) return NextResponse.json({ error: 'Link not found' }, { status: 404 });
  return NextResponse.json(link);
}

// DELETE Link (The Logic needed for your button)
export async function DELETE(request: Request, { params }: { params: { code: string } }) {
  try {
    await prisma.link.delete({
      where: { shortCode: params.code }
    });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: 'Link not found or already deleted' }, { status: 404 });
  }
}