import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsuarioSistemaRoleService } from './usuario-sistema-role.service';
import { CreateUsuarioSistemaRoleDto } from './dto/create-usuario-sistema-role.dto';
import { UpdateUsuarioSistemaRoleDto } from './dto/update-usuario-sistema-role.dto';

@Controller('usuario-sistema-role')
export class UsuarioSistemaRoleController {
  constructor(private readonly usuarioSistemaRoleService: UsuarioSistemaRoleService) {}

  @Post()
  create(@Body() createUsuarioSistemaRoleDto: CreateUsuarioSistemaRoleDto) {
    return this.usuarioSistemaRoleService.create(createUsuarioSistemaRoleDto);
  }

  @Get()
  findAll() {
    return this.usuarioSistemaRoleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuarioSistemaRoleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioSistemaRoleDto: UpdateUsuarioSistemaRoleDto) {
    return this.usuarioSistemaRoleService.update(+id, updateUsuarioSistemaRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuarioSistemaRoleService.remove(+id);
  }
}
