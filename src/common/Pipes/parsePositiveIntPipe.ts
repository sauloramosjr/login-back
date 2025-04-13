import {
    PipeTransform,
    Injectable,
    BadRequestException,
  } from '@nestjs/common';
  
  @Injectable()
  export class ParsePositiveIntPipe implements PipeTransform {
    transform(value: any) {
      const val = parseInt(value, 10);
  
      if (isNaN(val) || val <= 0) {
        throw new BadRequestException("O parâmetro 'id' deve ser um número positivo válido.");
      }
  
      return val;
    }
  }