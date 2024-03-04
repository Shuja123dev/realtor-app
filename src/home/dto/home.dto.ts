import { PropertyType } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";


export class CreateHomeDto {
    @IsNotEmpty()
    @IsString()
    adress: string;

    @IsNumber()
    @IsPositive()
    noOfBedrooms: number;

    @IsNumber()
    @IsPositive()
    noOfBathrooms: number;

    @IsNotEmpty()
    @IsString()
    City: string;

    @IsNumber()
    @IsPositive()
    price: number;

    @IsNumber()
    @IsPositive()
    landSize: number;

    @IsEnum(PropertyType)
    propertyType: PropertyType;

    @IsNumber()
    @IsPositive()
    realtorId: number;
}