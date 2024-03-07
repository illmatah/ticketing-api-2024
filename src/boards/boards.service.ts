import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class BoardsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.BoardCreateInput): Promise<Board> {
    return await this.prisma.board.create({ data });
  }

  async findAll(): Promise<Board[]> {
    return await this.prisma.board.findMany();
  }

  async findOne(id: number) {
    const board = await this.prisma.board.findUnique({ where: { id } });
    if (board === null) {
      throw new NotFoundException('Board Not found');
    }
    return board;
  }

  update(id: number, data: Prisma.BoardUpdateInput) {
    return this.prisma.board.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.board.delete({ where: { id } });
  }
}
