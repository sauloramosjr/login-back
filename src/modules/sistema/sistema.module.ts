import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsuarioSistemaRoleModule } from '../usuario-sistema-role/usuario-sistema-role.module';
import { Sistema } from './entities/sistema.entity';
import { SistemaController } from './sistema.controller';
import { SistemaService } from './sistema.service';

@Module({
  imports: [SequelizeModule.forFeature([Sistema]),  forwardRef(() => UsuarioSistemaRoleModule)],
  controllers: [SistemaController],
  providers: [SistemaService],
})
export class SistemaModule {}
