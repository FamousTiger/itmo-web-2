import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUrl } from 'class-validator';

export class ProjectDto {
  @ApiProperty({
    description: 'Skill ID',
    example: 'one',
  })
  @IsNotEmpty()
  readonly id: string;

  @ApiProperty({
    description: 'Project name',
    example: 'Witcher 3',
  })
  readonly name: string;

  @ApiProperty({
    description: 'Link to the project image',
    example:
      'https://ixbt.online/gametech/games/2021/01/31/CEgdlW9GHLsXlYnUXse3tNBWvu8EWiAMVvoUqCfI.jpg',
  })
  @IsUrl()
  readonly link: string;
}
