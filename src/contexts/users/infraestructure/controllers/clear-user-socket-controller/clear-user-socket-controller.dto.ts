import { IsNotEmpty, IsString } from 'class-validator';

export class ClearUserSocketControllerDto {
  @IsString()
  @IsNotEmpty()
  public socketId: string;
}
