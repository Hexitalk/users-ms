import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserSocketControllerDto {
  @IsMongoId()
  @IsNotEmpty()
  public id: string;

  @IsString()
  @IsNotEmpty()
  public socketId: string;
}
