import { Module, HttpModule } from '@nestjs/common';
import { Customer } from './entity/customer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { Otp } from './entity/otp.entity';
import { CustomerToken } from './entity/customer-token.entity';
// import { StoreService } from '../shared/service/store.service';
import { JwtModule } from '@nestjs/jwt';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [TypeOrmModule.forFeature([Customer, Otp, CustomerToken]), HttpModule, JwtModule.register({
    secret: 'BuyerGainsSecret',
    signOptions: { expiresIn: '7d' }
  }),
  SharedModule
  ],
  controllers: [CustomerController],
  providers: [CustomerService]
})
export class CustomerModule { }
