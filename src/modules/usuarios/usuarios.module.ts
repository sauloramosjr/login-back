import { forwardRef, Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Usuario } from './entities/usuario.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UsuarioSistemaRole } from '../usuario-sistema-role/entities/usuario-sistema-role.entity';
import { UsuarioSistemaRoleModule } from '../usuario-sistema-role/usuario-sistema-role.module';

@Module({
  imports: [SequelizeModule.forFeature([Usuario,UsuarioSistemaRole]),  forwardRef(() => AuthModule),forwardRef(() => UsuarioSistemaRoleModule)],
  controllers: [UsuariosController],
  providers: [UsuariosService],
  exports: [UsuariosService],
})
export class UsuariosModule {}
