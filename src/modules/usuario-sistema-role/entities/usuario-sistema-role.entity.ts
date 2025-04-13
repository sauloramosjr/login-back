import { InferAttributes, InferCreationAttributes } from 'sequelize';
import {
    BelongsTo,
    Column,
    ForeignKey,
    Model,
    Table
} from 'sequelize-typescript';
import { Role } from 'src/modules/role/entities/role.entity';
import { Sistema } from 'src/modules/sistema/entities/sistema.entity';
import { Usuario } from 'src/modules/usuarios/entities/usuario.entity';

@Table
export class UsuarioSistemaRole extends  Model<
  InferAttributes<UsuarioSistemaRole>,
  InferCreationAttributes<UsuarioSistemaRole>
> {

  @ForeignKey(() => Usuario)
  @Column
  usuarioId: number;

  @ForeignKey(() => Sistema)
  @Column
  sistemaId: number;

  @ForeignKey(() => Role)
  @Column
  roleId: number;

  @BelongsTo(() => Usuario)
  usuario: Usuario;

  @BelongsTo(() => Sistema)
  sistema: Sistema;

  @BelongsTo(() => Role)
  role: Role;
}
