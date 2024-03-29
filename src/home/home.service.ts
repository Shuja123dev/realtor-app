import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class HomeService {
    constructor(private readonly prismaService: PrismaService) { };

    async getAllHomes() {
        return this.prismaService.home.findMany();
    }
}
