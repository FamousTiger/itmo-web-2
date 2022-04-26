import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SkillDto {
  @ApiProperty({
    description: 'Skill name',
    example: 'C++',
  })
  readonly name: string;

  @ApiProperty({
    description: 'Link to the skill logo',
    example:
      'https://camo.githubusercontent.com/341abe5ac8494136a07b71a4ee902b1d6432e31ad08f35775b91810810ebc953/68747470733a2f2f69736f6370702e6f72672f6173736574732f696d616765732f6370705f6c6f676f2e706e67',
  })
  @IsNotEmpty()
  readonly link: string;
}
