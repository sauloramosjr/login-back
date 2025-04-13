import { Injectable } from '@nestjs/common';
import { CreateUsuarioSistemaRoleDto } from './dto/create-usuario-sistema-role.dto';
import { UpdateUsuarioSistemaRoleDto } from './dto/update-usuario-sistema-role.dto';

@Injectable()
export class UsuarioSistemaRoleService {
  create(createUsuarioSistemaRoleDto: CreateUsuarioSistemaRoleDto) {
    return 'This action adds a new usuarioSistemaRole';
  }

  findAll() {
    return `This action returns all usuarioSistemaRole`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usuarioSistemaRole`;
  }

  update(id: number, updateUsuarioSistemaRoleDto: UpdateUsuarioSistemaRoleDto) {
    return `This action updates a #${id} usuarioSistemaRole`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuarioSistemaRole`;
  }
}
