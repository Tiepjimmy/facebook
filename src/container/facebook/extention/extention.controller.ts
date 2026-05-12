import {Body, Controller, Post} from '@nestjs/common';
import { LoginDto } from "../extention/dto/login.dto";
import { ExtentionService } from "./extention.service";

@Controller('extention')
export class ExtentionController {
    constructor(
        private readonly extentionService:
        ExtentionService
    ) {}

    //get config
    @Post('getConfig')
    async getConfig(
        @Body() dto: LoginDto
    ){

        return this.extentionService
            .getConfig(dto.email);
    }
}
