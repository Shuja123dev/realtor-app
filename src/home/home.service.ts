import { Injectable } from '@nestjs/common';
import { PropertyType } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

interface Filters {
    city?: string;
    price: object;
    propertyType?: PropertyType
}

@Injectable()
export class HomeService {
    constructor(private readonly prismaService: PrismaService) { };

    async getHomes({
        city,
        price,
        propertyType
    }: Filters) {
        return this.prismaService.home.findMany({
            where: {
                City: city,
                price,
                propertyType: propertyType
            }
        })
    }
}
