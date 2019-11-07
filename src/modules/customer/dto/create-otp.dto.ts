import { IsNotEmpty, IsEmail } from 'class-validator';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';


export class CreateOtpDto {

    @ApiModelProperty()
    @IsNotEmpty()
    readonly contact_number: number;

    @ApiModelProperty()
    @IsNotEmpty()
    readonly type: string;

    @ApiModelPropertyOptional()
    @IsEmail()
    readonly email: string;
}