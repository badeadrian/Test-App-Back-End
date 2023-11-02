import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

// Use the Module decorator to define a module and its metadata
@Module({
  // Define the modules that will be imported and used by this module
  imports: [
    // Import and configure the PassportModule with the default strategy set to 'jwt'
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      // Import and configure the JwtModule with secret key and sign options
      secret: process.env.JWT_SECRET || 'default', // Set the secret key for JWT signing and verification. Use the environment variable or fallback to 'default'
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [JwtStrategy], // Providers define the classes that Nest can inject into the controllers and other providers
  exports: [JwtModule], // Exports make this module's features available for other modules
})
export class JwtAuthModule {}
