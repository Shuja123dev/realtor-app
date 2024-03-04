import { UserType } from "@prisma/client";
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Matches, MinLength } from "class-validator";

export class SignupDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(5)
    password: string;

    @Matches(/^\+?(\d{1,3})?[-. ]?\(?\d{3}\)?[-. ]?\d{3}[-. ]?\d{4}$/)
    phoneNumber: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    productKey?: string;
}

export class SignInDto {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(5)
    password: string;
}


export class GenerateProductKeyDto {
    @IsEmail()
    email: string;

    @IsEnum(UserType)
    userType: UserType;
}