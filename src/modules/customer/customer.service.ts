import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entity/customer.entity';
import { Repository } from 'typeorm';
import { Otp } from './entity/otp.entity';
import { CreateOtpDto } from './dto/create-otp.dto';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { StoreService } from '../shared/service/store.service';
import { JwtService} from '@nestjs/jwt';
import { CustomerToken } from './entity/customer-token.entity';
import { LoginCustomerDto } from './dto/login-customer.dto';

@Injectable()
export class CustomerService {
    constructor(
        @InjectRepository(Customer)
        private readonly customerRepository: Repository<Customer>,
        @InjectRepository(Otp)
        private readonly otpRepository: Repository<Otp>,
        @InjectRepository(CustomerToken)
        private readonly customerTokenRepository: Repository<CustomerToken>,
        private readonly storeService: StoreService,
        private readonly jwtService: JwtService
    ) { }


    /**
    * This is for generate the otp for both while login and register through phone number.
    * @returns A six digit random otp.
    */
    async generateOtp(createOtpDto: CreateOtpDto): Promise<Otp> {
        const isRegistered = await this.customerRepository.findOne({ where: { contact_number: createOtpDto.contact_number } })
        if (createOtpDto.type == 'login' && !isRegistered) {
            throw new HttpException('You are not registered. Please register to continue.', HttpStatus.OK);
        }
        if (createOtpDto.type == 'register' && createOtpDto.email && isRegistered && isRegistered.email == createOtpDto.email) {
            throw new HttpException('You are already registered. Please login to continue.', HttpStatus.OK);
        }
        const currentDate = new Date();
        const otpRecord = {
            otp: 123456,    //Math.floor(100000 + Math.random() * 900000),
            contact_number: createOtpDto.contact_number,
            expiry_date: new Date(currentDate.setMinutes(currentDate.getMinutes() + 10)),
        }
        try {
            const otpObj = await this.otpRepository.save(otpRecord);
            return otpObj;
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.OK);
        }
    }

    /**
    * This is for register acustomer through phone number registration.
    * @returns The customer object with the token associated with it.
    */
    async register(createCustomerDto: CreateCustomerDto): Promise<any>{
        const currentDate = new Date();
        const otpObj = await this.otpRepository.findOne({ where: { contact_number: createCustomerDto.contact_number, otp: createCustomerDto.otp, is_verified: false } });
        const otpVerified = otpObj && !otpObj.is_verified && currentDate < otpObj.expiry_date;
        if (!otpVerified) {
            throw new HttpException('Otp verification failed.', HttpStatus.NON_AUTHORITATIVE_INFORMATION)
        }

        const { otp, contact_number, ...customer } = createCustomerDto;
        //customer.phone = (createCustomerDto.contact_number).toString();
        const cust = await this.createCustomer(customer);

        const newCustomer = await this.customerRepository.save({
            customer_id: cust[0].id,
            contact_number: createCustomerDto.contact_number,
            email: createCustomerDto.email
        });
        otpObj.is_verified = false;
        await this.otpRepository.save(otpObj);
        await this.otpRepository.update(otpObj, {is_verified : true})
        if (!newCustomer) {
            throw new HttpException('Unable to register.', HttpStatus.OK);
        }
        const token = this.jwtService.sign({ id: newCustomer.id })
        await this.customerTokenRepository.save({ token : token , customerId: newCustomer.id})
        const customerObject = cust[0]
        return { customerObject, token };
    }

    async login(loginCustomerDto: LoginCustomerDto) {
        const currentDate = new Date();
        const otpObj = await this.otpRepository.findOne({ where: { contact_number: loginCustomerDto.contact_number, otp: loginCustomerDto.otp, is_verified: false } });
        const otpVerified = otpObj && !otpObj.is_verified && currentDate < otpObj.expiry_date;
        if (!otpVerified) {
            throw new HttpException('Otp verification failed.', HttpStatus.OK)
        }
        try {
            const customer = await this.customerRepository.findOne({ where: { contact_number: loginCustomerDto.contact_number } })
            if (!customer) {
                throw new HttpException('You are not registered.', HttpStatus.OK)
            }
            await this.otpRepository.save({
                ...otpObj,
                is_verified: true
            });
            const customerObj = await this.getCustomer(customer.customer_id);
            const token = this.jwtService.sign({ id: customer.id })
            await this.customerTokenRepository.save({ token : token , customer: customer})
            return { customerObj, token };
    
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.OK);
        }
    }


    private async createCustomer(customerObject: any): Promise<any> {
        const customer = await this.storeService.post('v3/customers', [customerObject]);
        return customer;
    }

    private async getCustomer(customerId: any): Promise<any> {
        const customer = await this.storeService.get('v2/customers/'+ customerId);
        return customer;
    }


}
