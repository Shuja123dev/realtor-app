import { Body, Controller, Get, Post } from '@nestjs/common';
import { HomeService } from './home.service';

@Controller('home')
export class HomeController {
    constructor(private readonly homeService: HomeService) { };

    @Get("")
    getAllHomes() {
        return this.homeService.getAllHomes();
    }

    @Post()
    createHome(
        @Body() body
    ) {

    }
}
