import { InferAttributes, InferCreationAttributes  } from 'sequelize';
import { Column, HasMany, Table,Model } from 'sequelize-typescript';
import { UsuarioSistemaRole } from 'src/modules/usuario-sistema-role/entities/usuario-sistema-role.entity';
@Table
export class Sistema extends Model<
  InferAttributes<Sistema>,
  InferCreationAttributes<Sistema>
> {
  @Column
  nome: string;

  @HasMany(() => UsuarioSistemaRole)
  usuarioSistemaRoles: UsuarioSistemaRole[];
}
