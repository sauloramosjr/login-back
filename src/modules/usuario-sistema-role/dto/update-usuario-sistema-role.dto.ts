import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioSistemaRoleDto } from './create-usuario-sistema-role.dto';

export class UpdateUsuarioSistemaRoleDto extends PartialType(CreateUsuarioSistemaRoleDto) {}
