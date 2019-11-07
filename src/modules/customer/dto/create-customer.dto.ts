import { IsNotEmpty, IsEmpty, IsEmail, IsPhoneNumber } from 'class-validator';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';


export class CreateCustomerDto {

    @ApiModelProperty()
    @IsNotEmpty()
    readonly first_name: string;

    @ApiModelProperty()
    @IsNotEmpty()
    readonly last_name: string;

    @ApiModelPropertyOptional()
    @IsEmail()
    readonly email: string;

    @ApiModelPropertyOptional()
    readonly contact_number: number;

    @ApiModelProperty()
    readonly otp: number;
}