import { IsString, IsEmail, Length } from 'class-validator';

export class RegistrationDto {
    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @Length(8, 8)
    password: string;

    @IsString()
    @Length(3, 20)
    name: string;
}

export class LoginDto {
    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @Length(8, 8)
    password: string;
}
