import {
    Body,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Post,
    UseGuards,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import {UsersService} from "./users.service";
import {CreateUserDto} from "./create-user.dto";
import {JwtAuthGuard} from "../auth/guards/jwt.auth-guard";

const bcrypt = require('bcrypt');

@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService
    ) {}

    @Post('/signup')
    @UsePipes(new ValidationPipe())
    async signup(@Body() createUserDto: CreateUserDto) {
        const usernameExists = await this.usersService.findOne({username: createUserDto.username });
        const emailExists = await this.usersService.findOne({ email: createUserDto.email});

        if(usernameExists) {
            throw new HttpException('Username already exists', HttpStatus.CONFLICT);
        }

        if(emailExists) {
            throw new HttpException('Email address already exists', HttpStatus.CONFLICT);
        }

        await bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(createUserDto.password, salt, async (err, hash) => {
                createUserDto.password = hash;
                createUserDto.last_login = null;
                createUserDto.settings = JSON.stringify({});
                return await this.usersService.create(createUserDto);
            });
        });
    }

    @UseGuards(JwtAuthGuard)
    @Get('test')
    test() {
        return 'yolo';
    }

}
