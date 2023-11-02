import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// Use the Injectable decorator to define a provider that can be injected into other classes
// Extend the built-in AuthGuard class from '@nestjs/passport' with the strategy named 'jwt'
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
