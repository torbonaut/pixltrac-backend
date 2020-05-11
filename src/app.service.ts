import { Injectable } from '@nestjs/common';
import { PrismaClient, Entry } from '@prisma/client';

@Injectable()
export class AppService {
  async getHello(): Promise<string> {

    const prisma = new PrismaClient();

    const entries: Entry[] = await prisma.entry.findMany();

    return entries.map( (e: Entry) => (e.date.toDateString() + ': ' + e.value.toString())).join(', ');

  }
}
