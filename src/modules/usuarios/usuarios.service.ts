import { InjectModel } from '@nestjs/sequelize';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { AcessoDto, CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { hash } from 'bcrypt';
import { Usuario } from './entities/usuario.entity';
import { CreationAttributes } from 'sequelize';
import { UsuarioSistemaRole } from '../usuario-sistema-role/entities/usuario-sistema-role.entity';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectModel(Usuario) private _entity: typeof Usuario,
    @InjectModel(UsuarioSistemaRole)
    private usuarioSistemaRoleModel: typeof UsuarioSistemaRole,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    const usuarioJaExiste = await this._entity.findOne({
      where: { email: createUsuarioDto.email },
      raw: true,
    });

    if (usuarioJaExiste) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          message: 'Já existe um usuário com este email!',
        },
        HttpStatus.CONFLICT,
      );
    }

    const senhaCriptografada = await hash(createUsuarioDto.password, 10);
    createUsuarioDto.password = senhaCriptografada;

    const usuario = await this._entity.create(
      createUsuarioDto as CreationAttributes<Usuario>,
    );

    const { id } = usuario.dataValues;
    let acessosCriados: UsuarioSistemaRole[] = [];
    if (createUsuarioDto.acessos?.length) {
      acessosCriados = await Promise.all(
        createUsuarioDto.acessos.map((element) =>
          this.usuarioSistemaRoleModel
            .create({
              usuarioId: Number(id),
              sistemaId: Number(element.sistemaId),
              roleId: Number(element.roleId),
            } as CreationAttributes<UsuarioSistemaRole>)
            .then((e) => {
              const { roleId, sistemaId } = e.dataValues;
              return { roleId, sistemaId } as UsuarioSistemaRole;
            }),
        ),
      );
    }

    const { dataValues } = usuario;
    const { password, updatedAt, createdAt, ..._user } = dataValues;

    return { ..._user, acessos: acessosCriados };
  }

  async findAll() {
    const users = await this._entity.findAll({
      raw: true,
    });
    if (users.length > 0) {
      return users.map((user) => {
        const { password, ..._user } = user;

        return _user;
      });
    }
    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        message: 'Não foi encontrado nenhum usuario!',
      },
      HttpStatus.NOT_FOUND,
    );
  }

  async findOne(id: number) {
    const user = await this._entity.findOne({
      where: {
        id: id,
      },
      raw: true,
    });
    if (user) {
      const { password, ..._user } = user;
      return _user;
    }
    throw new HttpException(
      {
        status: HttpStatus.NOT_FOUND,
        message: 'Não foi encontrado usuario com este ID!',
      },
      HttpStatus.NOT_FOUND,
    );
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    await this.findOne(id);
    if (!!updateUsuarioDto.password) {
      updateUsuarioDto.password = await hash(updateUsuarioDto.password, 10);
    }
    const { acessos, ...rest } = updateUsuarioDto;
    return this._entity.update(rest, { where: { id } });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this._entity.destroy({ where: { id: id } });
  }

  async getByEmail(email: string) {
    const user = await this._entity.findOne({
      where: {
        email: email,
      },
      raw: true,
    });
    if (user) {
      return user;
    }
  }
}
