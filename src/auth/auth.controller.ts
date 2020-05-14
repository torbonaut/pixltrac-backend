import {Controller, HttpCode, HttpStatus, Post, Req, UseGuards} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {LocalAuthGuard} from "./guards/local.auth-guard";

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) {}

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    @HttpCode(HttpStatus.OK)
    async login(@Req() request) {
        return await this.authService.login(request.user);
    }

    
}
