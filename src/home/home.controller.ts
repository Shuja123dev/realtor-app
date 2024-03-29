import { Body, Controller, Get, Post } from '@nestjs/common';
import { HomeService } from './home.service';
import { CreateHomeDto } from './dto/home.dto';

@Controller('home')
export class HomeController {
    constructor(private readonly homeService: HomeService) { };

    @Get("")
    getHomes() {
        return this.homeService.getHomes();
    }

    @Post()
    createHome(
        @Body() body: CreateHomeDto
    ) {

    }
}
