import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ParkingService {
  constructor(private prisma: PrismaService) {}

  async scan(uid: string) {
    let card = await this.prisma.card.findUnique({
      where: { uid },
    });

    // tạo thẻ nếu chưa có
    if (!card) {
      card = await this.prisma.card.create({
        data: {
          uid,
          status: 'ACTIVE',
        },
      });
    }

    // tìm vé đang mở
    const active = await this.prisma.ticket.findFirst({
      where: {
        cardId: card.id,
        status: 'OPEN',
      },
    });

    // 👉 CHECK-IN
    if (!active) {
      const ticket = await this.prisma.ticket.create({
        data: {
          cardId: card.id,
          checkinTime: new Date(),
          status: 'OPEN',
        },
      });

      return {
        type: 'IN',
        data: ticket,
      };
    }

    // 👉 CHECK-OUT
    const checkinTime = active.checkinTime ?? new Date();
    const hours = (Date.now() - checkinTime.getTime()) / 3600000;

    const fee = Math.ceil(hours) * 5000;

    const ticket = await this.prisma.ticket.update({
      where: { id: active.id },
      data: {
        checkoutTime: new Date(),
        fee,
        status: 'CLOSED',
      },
    });

    return {
      type: 'OUT',
      data: ticket,
    };
  }
}
