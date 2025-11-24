import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: { code: string } }) {
  const code = params.code;
  const link = await prisma.link.findUnique({ where: { shortCode: code } });

  if (!link) return new NextResponse("Link not found", { status: 404 });

  prisma.link.update({
    where: { id: link.id },
    data: { clicks: { increment: 1 }, lastClickedAt: new Date() },
  }).catch(console.error);

  return NextResponse.redirect(link.originalUrl);
}