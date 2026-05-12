import { Injectable } from '@nestjs/common';
import {PrismaService} from "../../prisma/prisma.service";

@Injectable()
export class UserAccessHelper {

    constructor(private prisma: PrismaService) {}

    // =========================
    // GET USER + VALIDATE
    // =========================

    async getValidUser(email: string) {

        const user =
            await this.prisma.user.findUnique({
                where: { email }
            });

        const now = new Date();

        if (
            !user ||
            !user.status ||
            (user.endDate && user.endDate < now)
        ) {
            return null;
        }

        return user;
    }

}
