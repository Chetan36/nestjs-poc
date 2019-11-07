import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/user/entitiy/user.entity';
import { Customer } from './modules/customer/entity/customer.entity';
import { CustomerModule } from './modules/customer/customer.module';
import { Otp } from './modules/customer/entity/otp.entity';
import { CustomerToken } from './modules/customer/entity/customer-token.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'bg_nest',
      entities: [User, Customer, Otp, CustomerToken],
      synchronize: true,
    }),
    UserModule,
    CustomerModule
  ]
})
export class AppModule {}
