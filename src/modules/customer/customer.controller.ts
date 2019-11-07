import { Controller, Post, Body, Get } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';
import { CreateOtpDto } from './dto/create-otp.dto';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { LoginCustomerDto } from './dto/login-customer.dto';

@ApiBearerAuth()
@ApiUseTags('Customer')
@Controller('customers')
export class CustomerController {
    constructor(private readonly customerService: CustomerService) { }

    @Post('generateOtp')
    async generateOtp(@Body() createOtpDto: CreateOtpDto) {
        try {
            const otpObject = await this.customerService.generateOtp(createOtpDto);
            return otpObject;
        } catch (error) {
            return error;
        }
    }

    @Post()
    async register(@Body() createCustomerDto: CreateCustomerDto) {
        return this.customerService.register(createCustomerDto);
    }

    @Post('login')
    async login(@Body() loginCustomerDto: LoginCustomerDto) {
        try {
            const customer = await this.customerService.login(loginCustomerDto);
            return customer;
        } catch (error) {
            return error;
        }
    }
}

