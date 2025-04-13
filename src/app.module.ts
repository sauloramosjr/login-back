import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { SistemaModule } from './modules/sistema/sistema.module';
import { RoleModule } from './modules/role/role.module';
import { UsuarioSistemaRoleModule } from './modules/usuario-sistema-role/usuario-sistema-role.module';
import { Usuario } from './modules/usuarios/entities/usuario.entity';
import { UsuarioSistemaRole } from './modules/usuario-sistema-role/entities/usuario-sistema-role.entity';
import { Sistema } from './modules/sistema/entities/sistema.entity';
import { Role } from './modules/role/entities/role.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        dialect: 'postgres',
        host: config.get('HOST_BANCO_DEV'),
        port: Number(config.get('PORTA_BANDO_DADOS')),
        username: config.get('USUARIO_BANCO_DADOS'),
        password: config.get('SENHA_BANCO_DADOS'),
        database: config.get('DATA_BASE'),
        autoLoadModels: true,
        synchronize: true,
        ssl: true,
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        }  
      }),
    }),
    UsuariosModule,
    UsuarioSistemaRoleModule,
    AuthModule,
    SistemaModule,
    RoleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {}
