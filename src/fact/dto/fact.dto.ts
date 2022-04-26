import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class FactDto {
  @ApiProperty({
    description: 'Fact',
    example: 'Студент ИТМО',
  })
  @IsNotEmpty()
  readonly fact: string;
}
