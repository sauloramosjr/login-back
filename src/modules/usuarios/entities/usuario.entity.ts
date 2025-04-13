import { InferAttributes, InferCreationAttributes } from 'sequelize';
import {
  Column,
  DataType,
  HasMany,
  Model,
  Table
} from 'sequelize-typescript';
import { UsuarioSistemaRole } from '../../usuario-sistema-role/entities/usuario-sistema-role.entity';

@Table
export class Usuario extends Model<
  InferAttributes<Usuario>,
  InferCreationAttributes<Usuario>
> {

  @Column
  nome: string;

  @Column
  email: string;

  @Column
  password: string;

  @Column({ defaultValue: true })
  ativo: boolean;

  @Column(DataType.STRING)
  fotoPerfil: string;

  @HasMany(() => UsuarioSistemaRole)
  acessos: UsuarioSistemaRole[];
}
