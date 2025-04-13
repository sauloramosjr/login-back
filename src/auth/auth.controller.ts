import {
  Controller,
  Get,
  Post,
  Request,
  UseGuards
} from '@nestjs/common';
import { UsuariosService } from '../modules/usuarios/usuarios.service';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly _userService: UsuariosService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: any) {
    const token = await this.authService.login(req.user);
    const user = await this._userService.getByEmail(req.user.email);
    if (!user) return { error: 'Usuário não encontrado' };
    const {password,createdAt,updatedAt, ..._user} = user 

    return { ..._user, ...token };
  }
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    const token = await this.authService.login(req.user);
    const user = await this._userService.getByEmail(req.user.email);
    if (!user) return { error: 'Usuário não encontrado' };
    const {password, ..._user} = user 

    return {
      user: { id: _user.id, email: _user.email, nome: _user.nome },
      ...token,
    };
  }
}
