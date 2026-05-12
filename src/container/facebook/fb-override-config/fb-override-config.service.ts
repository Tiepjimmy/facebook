import {BadRequestException, Injectable} from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { ROLE } from '../../../common/constants/role';
import {ListDto} from "./dto/list.dto";
import {CreateFbConfigDto} from "./dto/create.dto";

@Injectable()
export class FbOverrideConfigService {

    constructor(
        private prisma: PrismaService
    ) {}

    async getList(email: string, role: string): Promise<ListDto[]> {
        const user = await this.prisma.user.findUnique({
            where: { email }
        });

        const now = new Date();

        if (!user || !user.status || (user.endDate && user.endDate < now)) {
            return [];
        }

        const results = await (async () => {
            if (role === ROLE.ADMIN) {
                return await this.prisma.fbOverrideConfig.findMany({
                    orderBy: { id: 'desc' },
                    include: { user: true }
                });
            } else {
                return await this.prisma.fbOverrideConfig.findMany({
                    where: {
                        userId: user.id,
                        isActive: true
                    },
                    orderBy: { rowIndex: 'asc' }
                });
            }
        })();

        return results.map((item: any) => ({
            id: item.id,
            rowIndex: item.rowIndex,
            clickValue: item.clickValue,
            pricePerClick: item.pricePerClick,
            isActive: item.isActive,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
        }));
    }

    async create(email: string, dto: CreateFbConfigDto) {

        const user =
            await this.prisma.user.findUnique({
                where: { email }
            });

        if (!user) {
            throw new BadRequestException('Tài khoản không tồn tại!');
        }

        const setting = await this.prisma.fbOverrideConfig.findFirst({
            where: {
                userId: user.id,
                rowIndex: dto.rowIndex
            },
        });

        if (setting) {
            throw new BadRequestException('Tài khoản không tồn tại!');
        }


        return this.prisma.fbOverrideConfig.create({
            data: {
                userId: user.id,
                rowIndex: dto.rowIndex,
                clickValue: dto.clickValue,
                pricePerClick: dto.pricePerClick,
                isActive: true
            }
        });
    }

    async findOne(id: string) {
        return this.prisma.fbOverrideConfig.findUnique({
            where: {
                id: BigInt(id)
            }
        });

    }
    async update(id: string, dto: any) {
        return this.prisma.fbOverrideConfig.update({
            where: {
                id: BigInt(id)
            },
            data: {
                clickValue: dto.clickValue,
                pricePerClick: dto.pricePerClick,
                isActive: dto.isActive
            }
        });

    }
    async remove(id: string) {
        return this.prisma.fbOverrideConfig.delete({
            where: {
                id: BigInt(id)
            },
        });
    }

}
