import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import {UsersService} from "../users/users.service";
const bcrypt = require('bcrypt');


@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService
    ) {}

    async validateUser(username: string, password: string): Promise<User> {
        const user = await this.userService.findOne({ username });

        if(user && bcrypt.compare(password, user.password)) {
            return user;
        } else {
            return null;
        }
    }
}
