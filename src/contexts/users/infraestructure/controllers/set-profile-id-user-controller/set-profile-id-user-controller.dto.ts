import { IsMongoId, IsNotEmpty } from 'class-validator';

export class SetProfileIdUserControllerDto {
  @IsMongoId()
  @IsNotEmpty()
  public profile_id: string;
}
