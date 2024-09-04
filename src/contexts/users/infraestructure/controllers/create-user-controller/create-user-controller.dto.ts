import { IsEmail, IsString } from 'class-validator';

export class CreateUserControllerDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}
