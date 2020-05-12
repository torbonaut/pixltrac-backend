import {IsDate, IsEmail, IsEmpty, IsOptional, IsString, Length} from 'class-validator';

export class CreateUserDto {
    @Length(2, 20)
    @IsString()
    username: string;

    @IsEmail()
    email: string;

    @Length(8, 72)
    @IsString()
    password: string;

    @IsOptional()
    @IsString()
    settings: string;

    @IsEmpty()
    last_login: Date;

    @IsEmpty()
    id: number;

    @IsEmpty()
    created: Date;
}
