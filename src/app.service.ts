import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AppService {
  async getHello(): Promise<string> {

    const prisma = new PrismaClient();

    const users = await prisma.entry.findMany();

    return users.toString();
  }
}
