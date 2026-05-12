import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Body,
    Param,
    Req,
    UseGuards
} from '@nestjs/common';

import { FbOverrideConfigService } from './fb-override-config.service';
import {JwtAuthGuard} from "../auth/guards";

@Controller('fb-override-config')
export class FbOverrideConfigController {

    constructor(
        private service: FbOverrideConfigService
    ) {}

    // =========================
    // GET LIST (ADMIN / USER)
    // =========================

    @UseGuards(JwtAuthGuard)
    @Get()
    getList(@Req() req: any) {

        return this.service.getList(
            req.user.email,
            req.user.role
        );

    }

    // =========================
    // CREATE (AUTO USER FROM TOKEN)
    // =========================

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Req() req: any, @Body() dto: any) {

        return this.service.create(
            req.user.email,
            dto
        );

    }

    // =========================
    // GET ONE
    // =========================

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: string) {

        return this.service.findOne(id);

    }

    // =========================
    // UPDATE
    // =========================

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() dto: any
    ) {

        return this.service.update(id, dto);

    }

    // =========================
    // DELETE (SOFT)
    // =========================

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {

        return this.service.remove(id);

    }

}
