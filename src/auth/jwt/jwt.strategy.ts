import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  // Extend the base PassportStrategy with JWT Strategy
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract JWT token from Authorization header as a Bearer token
      ignoreExpiration: false, // Do not ignore token expiration (tokens should expire after a set duration)
      secretOrKey: process.env.JWT_SECRET || 'default', // Define the secret key to decode JWT token, use environment variable or default to 'default'
    });
  }

  async validate(payload: any) {
    // Validate function to extract user details from decoded JWT payload

    console.log('Validating payload:', payload);
    return { id: payload.sub, email: payload.email }; // Return the user's id and email from the payload
  }
}
