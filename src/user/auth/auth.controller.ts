import { Body, Controller, Param, ParseEnumPipe, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GenerateProductKeyDto, SignInDto, SignupDto } from '../dtos/auth.dto';
import { UserType } from '@prisma/client';
import * as bcrypt from 'bcryptjs'

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post("/signUp/:userType")
    async signUp(
        @Body() body: SignupDto,
        @Param("userType", new ParseEnumPipe(UserType)) userType: UserType
    ) {

        if (userType !== UserType.BUYER) {
            if (!body.productKey) {
                throw new UnauthorizedException("You must Provide Product key");
            }

            const validProductKey = `${body.email}-${userType}-${process.env.PRODUCT_KEY_SECRET}`;

            const isValidProductKey = await bcrypt.compare(validProductKey, body.productKey);

            if (!isValidProductKey) {
                throw new UnauthorizedException("Invalid Product key");
            }

        }

        return this.authService.signUp(body, userType);
    };


    @Post("/signIn")
    signIn(
        @Body() body: SignInDto
    ) {
        return this.authService.signIn(body);
    }

    @Post("/key")
    generateProductKey(
        @Body() { email, userType }: GenerateProductKeyDto
    ) {
        return this.authService.generateProductKey(email, userType);
    }
}
