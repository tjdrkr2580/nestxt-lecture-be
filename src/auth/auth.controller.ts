import { Csrf, Msg } from './interfaces/auth.interface';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Res,
  Req,
  Get,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authservice: AuthService) {}
  @Post('signup')
  signUp(@Body() dto: AuthDto): Promise<Msg> {
    return this.authservice.signUp(dto);
  }
}
