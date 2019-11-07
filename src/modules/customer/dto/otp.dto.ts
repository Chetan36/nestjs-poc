import { IsNotEmpty } from 'class-validator';
import { AbstractDto } from 'src/modules/shared/dto/abstract.dto';

export class OtpDto extends AbstractDto {

    @IsNotEmpty()
    readonly contact_number: number;
  
    @IsNotEmpty()
    readonly otp: number;
  
    readonly is_verified: boolean;

    readonly createdAt: Date;

    readonly updatedAt: Date;
}