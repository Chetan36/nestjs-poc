import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { AbstractEntity } from "src/modules/shared/entity/abstract.entity";
import { Customer } from "./customer.entity";

@Entity()
export class CustomerToken extends AbstractEntity {

    @Column()
    token: string;

    @Column({default : true})
    is_active: boolean;

    @ManyToOne(type => Customer, customer => customer.customer_token)
    customer: Customer;
}