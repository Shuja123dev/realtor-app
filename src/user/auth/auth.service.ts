import { ForbiddenException, HttpException, Injectable, Res } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs'
import { UserType } from '@prisma/client';
import * as jwt from 'jsonwebtoken';

interface SignUpParams {
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
}

interface SignInParams {
    email: string;
    password: string;
}

interface Response {
    user: {}
}

@Injectable()
export class AuthService {

    constructor(private readonly prismaServices: PrismaService) { };

    async signUp(
        { name, phoneNumber, email, password }: SignUpParams,
        userType: UserType
    ) {
        const userExists = await this.prismaServices.user.findUnique({
            where: {
                email
            }
        });
        console.log(userExists);

        if (userExists) {
            throw new ForbiddenException('User already exists')
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await this.prismaServices.user.create({
            data: {
                name,
                phone: phoneNumber,
                email,
                password: hashedPassword,
                userType: userType
            }
        });

        return {
            success: true,
            message: "User created successfully"
        };
    };

    async signIn({ email, password }: SignInParams) {
        const user = await this.prismaServices.user.findUnique({
            where: {
                email
            }
        });

        if (!user) {
            throw new HttpException("InValid Credentials", 400);
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid) {
            return {
                success: true,
                message: "User logged in successfully",
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                },
                token: jwt.sign({ id: user.id, userType: user.userType }, process.env.JWT_SECRET)
            }
        }
        else {
            throw new HttpException("Invalid Password", 400);
        }

    }

    generateProductKey(email: string, userType: UserType) {
        const keyString = `${email}-${userType}-${process.env.PRODUCT_KEY_SECRET}`;

        return bcrypt.hash(keyString, 10);
    }

}
