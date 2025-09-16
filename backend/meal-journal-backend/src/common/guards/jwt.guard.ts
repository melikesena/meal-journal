/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    const authHeader = request.headers['authorization'] || request.headers['Authorization'];
    if (!authHeader) throw new UnauthorizedException('Token missing');

    const token = authHeader.split(' ')[1]; // Bearer <token>
    if (!token) throw new UnauthorizedException('Token missing');

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET || 'secret');
      request.user = payload; // controller'da erişilebilir
      return true;
    } catch (err) {
      console.error('JWT verification failed', err);
      throw new UnauthorizedException('Invalid token');
    }
  }
}
