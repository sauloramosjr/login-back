import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsuariosModule } from '../modules/usuarios/usuarios.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

const PROVIDERS = [AuthService, LocalStrategy, JwtStrategy];
@Module({
  imports: [
    forwardRef(() => UsuariosModule),
    PassportModule.register({ defaultStrategy: 'local' }),
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [...PROVIDERS],
  exports: [...PROVIDERS, PassportModule],
})
export class AuthModule {}
