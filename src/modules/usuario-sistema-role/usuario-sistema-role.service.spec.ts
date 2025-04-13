import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioSistemaRoleService } from './usuario-sistema-role.service';

describe('UsuarioSistemaRoleService', () => {
  let service: UsuarioSistemaRoleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsuarioSistemaRoleService],
    }).compile();

    service = module.get<UsuarioSistemaRoleService>(UsuarioSistemaRoleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
