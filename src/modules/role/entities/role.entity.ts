import { InferAttributes, InferCreationAttributes } from 'sequelize';
import { Column, HasMany, Table,Model } from 'sequelize-typescript';
import { UsuarioSistemaRole } from 'src/modules/usuario-sistema-role/entities/usuario-sistema-role.entity';

@Table
export class Role extends Model<InferAttributes<Role>, InferCreationAttributes<Role>> {

  @Column
  nome: string; // ex: admin, editor, viewer

  @HasMany(() => UsuarioSistemaRole)
  usuarioSistemaRoles: UsuarioSistemaRole[];
}
