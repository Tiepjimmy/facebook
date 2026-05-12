import { Injectable } from '@nestjs/common';
import { PrismaService } from "../../../prisma/prisma.service";

@Injectable()
export class ExtentionService {
    constructor(
        private prisma: PrismaService
    ) {}

    async getConfig(email: string) {

        const user =
            await this.findUser(email);

        // =======================
        // USER NOT FOUND
        // =======================

        if(!user){
            return [];
        }

        // =======================
        // CHECK EXPIRED
        // =======================

        const isExpired =
            this.isExpired(user.endDate);

        // =======================
        // AUTO UPDATE STATUS
        // =======================

        if(isExpired){

            await this.disableUser(
                user.id
            );

            return [];
        }

        // =======================
        // USER BLOCKED
        // =======================

        if(!user.status){
            return [];
        }

        // =======================
        // GET CONFIG
        // =======================

        return await this.getConfigs(
            user.id
        );
    }

    // =========================
    // FIND USER
    // =========================

    private async findUser(
        email: string
    ){

        return this.prisma.user.findUnique({

            where: {
                email
            }

        });
    }

    // =========================
    // CHECK EXPIRED
    // =========================

    private isExpired(
        endDate: Date | null
    ){

        if(!endDate){
            return true;
        }

        return (
            new Date() > endDate
        );
    }

    // =========================
    // AUTO DISABLE USER
    // =========================

    private async disableUser(
        userId: bigint
    ){

        await this.prisma.user.update({

            where: {
                id: userId
            },

            data: {
                status: false
            }

        });
    }

    // =========================
    // GET CONFIGS
    // =========================

    private async getConfigs(
        userId: bigint
    ){

        const configs =
            await this.prisma
                .fbOverrideConfig
                .findMany({

                    where: {
                        userId,
                        isActive: true
                    },

                    orderBy: {
                        rowIndex: 'asc'
                    }

                });

        return configs.map(
            this.mapRow
        );
    }

    // =========================
    // MAP ROW
    // =========================

    private mapRow(row: any){

        return {

            index:
            row.rowIndex,

            click:
            row.clickValue,

            pricePerClick:
                Number(
                    row.pricePerClick
                )

        };
    }
}
