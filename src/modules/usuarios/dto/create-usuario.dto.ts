import {
  IsNotEmpty,
  IsEmail,
  IsString,
  IsOptional,
  ValidateNested,
  IsArray,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

export class AcessoDto {
  @IsNotEmpty()
  @IsNumber()
  sistemaId: number;

  @IsNotEmpty()
  @IsNumber()
  roleId: number;
}

export class CreateUsuarioDto {
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AcessoDto)
  acessos?: AcessoDto[];
}
