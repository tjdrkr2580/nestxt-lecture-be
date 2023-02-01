import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateTaskDto } from './dto/update-task-dto';
import { Injectable, ForbiddenException } from '@nestjs/common';
import { Task } from '@prisma/client';
import { CreateTaskDto } from './dto/create-task.dto';
@Injectable()
export class TodoService {
  constructor(private readonly prisma: PrismaService) {}
  getTasks(userId: number): Promise<Task[]> {
    return this.prisma.task.findMany({
      where: {
        userId,
      },
      orderBy: {
        createAt: 'desc',
      },
    });
  }
  getTaskById(userId: number, taskId: number): Promise<Task> {
    return this.prisma.task.findFirst({
      where: {
        userId,
        id: taskId,
      },
    });
  }

  async createTask(userId: number, dto: CreateTaskDto): Promise<Task> {
    const task = await this.prisma.task.create({
      data: {
        userId,
        ...dto,
      },
    });
    return task;
  }

  async updateTaskById(
    userId: number,
    taskId: number,
    dto: UpdateTaskDto,
  ): Promise<Task> {
    const task = await this.prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });
    if (!task || task.userId !== userId)
      throw new ForbiddenException('No permision to update');

    return this.prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        ...dto,
      },
    });
  }
}
