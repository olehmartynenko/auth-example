import { Exclude } from 'class-transformer';
import { IsNumber } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UserDto extends CreateUserDto {
  @IsNumber()
  id: number;

  @Exclude()
  password: string;
}
