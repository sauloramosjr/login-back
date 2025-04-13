import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UsuariosService } from '../modules/usuarios/usuarios.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UsuariosService)
    private userService: UsuariosService,
    @Inject(JwtService)
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}
  async validateUser(userEmail: string, userPassword: string) {
    const user = await this.userService.getByEmail(userEmail);
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          message: 'Credênciais inválidas!',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    if (await compare(userPassword, user.password)) {
      const { id, nome, email } = user;
      return { id, nome, email };
    }
    throw new HttpException(
      {
        status: HttpStatus.UNAUTHORIZED,
        message: 'Senha incorreta!',
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
  async login(user) {
    const payload = { email: user.email, id: user.id };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: this.configService.get('PassKey'),
        expiresIn:'4h'
      }),
    };
  }
}
