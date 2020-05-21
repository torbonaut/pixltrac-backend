import { Injectable } from '@nestjs/common';
import {
    PrismaClient,
    User,
    UserWhereInput,
    UserWhereUniqueInput,
    UserCreateInput,
    UserUpdateInput
} from '@prisma/client';

@Injectable()
export class UsersService {
    prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async findOne(search: UserWhereUniqueInput): Promise<User> {
        return await this.prisma.user.findOne({ where: search });
    }

    async findMany(search: UserWhereInput = {}): Promise<User[]> {
        return await this.prisma.user.findMany({ where: search });
    }

    async create(user: UserCreateInput): Promise<User> {
        return await this.prisma.user.create( { data: user });
    }

    async update(user: UserUpdateInput): Promise<User> {
        return await this.prisma.user.update( {
            data: user,
            where: {
                id: user.id
            }
        });
    }

    async delete(id: number) {
        return await this.prisma.user.delete({ where: { id }});
    }

}
