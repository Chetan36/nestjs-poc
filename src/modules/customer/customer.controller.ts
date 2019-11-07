import { Controller, Post, Body, Get, Res, HttpStatus } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';
import { CreateOtpDto } from './dto/create-otp.dto';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { LoginCustomerDto } from './dto/login-customer.dto';
import { ResponseService } from '../shared/service/response.service';
import { Response } from 'express';

@ApiBearerAuth()
@ApiUseTags('Customer')
@Controller('customers')
export class CustomerController {
    constructor(private readonly customerService: CustomerService, private readonly responseService: ResponseService) { }

    @Post('generateOtp')
    async generateOtp(@Body() createOtpDto: CreateOtpDto, @Res() response: Response) {
        try {
            const otpObject = await this.customerService.generateOtp(createOtpDto);
            // return otpObject;
            return this.responseService.successResponse(HttpStatus.OK, "Otp sent successfully", otpObject, response);
        } catch (error) {
            // return error;
            return this.responseService.errorResponse(error.status, error.message, response);
        }
    }

    @Post()
    async register(@Body() createCustomerDto: CreateCustomerDto) {
        return this.customerService.register(createCustomerDto);
    }

    @Post('login')
    async login(@Body() loginCustomerDto: LoginCustomerDto, @Res() response: Response) {
        try {
            const customer = await this.customerService.login(loginCustomerDto);
            return this.responseService.successResponse(HttpStatus.OK, "Login successful", customer, response);
        } catch (error) {
            // return error;
            return this.responseService.errorResponse(error.status, error.message, response);
        }
    }
}

