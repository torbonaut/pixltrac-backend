import {Injectable, UnauthorizedException} from '@nestjs/common';
import { User } from '@prisma/client';
import {UsersService} from "../users/users.service";
import {JwtPayload, JwtToken, LoginCredentials} from "./auth.model";
import {JwtService} from "@nestjs/jwt";
const bcrypt = require('bcrypt');


@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ) {}

    async validateUser(username: string, password: string): Promise<User> {
        const user = await this.userService.findOne({username});

        return (user && await bcrypt.compare(password, user.password)) ? user : null
    }

    async login(user: User): Promise<JwtToken> {
        const payload: JwtPayload = {
            id: user.id,
            username: user.username,
            email: user.email
        };

        return { token: this.jwtService.sign(payload) };
    }



}
