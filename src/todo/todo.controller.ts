import {
  Controller,
  Body,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  Req,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { Request } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task-dto';
import { Task } from '@prisma/client';

@UseGuards(AuthGuard('jwt'))
@Controller('todo')
export class TodoController {}
