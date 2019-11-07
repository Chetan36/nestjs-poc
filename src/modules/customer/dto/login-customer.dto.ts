import { IsNotEmpty, IsEmpty, IsEmail, IsPhoneNumber } from 'class-validator';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';


export class LoginCustomerDto {

    @ApiModelPropertyOptional()
    readonly contact_number: number;

    @ApiModelProperty()
    readonly otp: number;
}