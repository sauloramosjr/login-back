import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioSistemaRoleController } from './usuario-sistema-role.controller';
import { UsuarioSistemaRoleService } from './usuario-sistema-role.service';

describe('UsuarioSistemaRoleController', () => {
  let controller: UsuarioSistemaRoleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsuarioSistemaRoleController],
      providers: [UsuarioSistemaRoleService],
    }).compile();

    controller = module.get<UsuarioSistemaRoleController>(UsuarioSistemaRoleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
