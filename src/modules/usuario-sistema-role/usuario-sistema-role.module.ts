import { forwardRef, Module } from '@nestjs/common';
import { UsuarioSistemaRoleService } from './usuario-sistema-role.service';
import { UsuarioSistemaRoleController } from './usuario-sistema-role.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { UsuarioSistemaRole } from './entities/usuario-sistema-role.entity';
import { Sistema } from '../sistema/entities/sistema.entity';
import { Role } from '../role/entities/role.entity';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { SistemaModule } from '../sistema/sistema.module';
import { RoleModule } from '../role/role.module';

@Module({
  imports: [SequelizeModule.forFeature([UsuarioSistemaRole,Usuario,Role,Sistema]),  forwardRef(() => UsuariosModule), forwardRef(()=>SistemaModule),forwardRef(()=>RoleModule) ],
  controllers: [UsuarioSistemaRoleController],
  providers: [UsuarioSistemaRoleService],
  exports: [UsuarioSistemaRoleService],
})
export class UsuarioSistemaRoleModule {}
