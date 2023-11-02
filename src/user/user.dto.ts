import { IsEmail, IsString, Length } from 'class-validator';

//user registration
export class RegisterUserDto {
    @IsEmail()
    email: string;

    @IsString()
    @Length(6, 50)
    password: string;

    @IsString()
    name: string;
}

//user login
export class LoginUserDto {
    @IsEmail()
    email: string;

    @IsString()
    @Length(6, 50)
    password: string;
}