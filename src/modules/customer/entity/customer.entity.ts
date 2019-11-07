import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinTable } from "typeorm";
import { CustomerToken } from "./customer-token.entity";
import { AbstractEntity } from "src/modules/shared/entity/abstract.entity";
import { ApiModelProperty } from "@nestjs/swagger";

@Entity()
export class Customer extends AbstractEntity {

    @ApiModelProperty()
    @Column({ nullable: true })
    customer_id: number;

    @ApiModelProperty()
    @Column({ nullable: true })
    google_id: string;

    @ApiModelProperty()
    @Column({ nullable: true })
    facebook_id: string;

    @ApiModelProperty()
    @Column('bigint', { nullable: true })
    contact_number: number;

    @ApiModelProperty()
    @Column({ nullable: true })
    email: string;

    @ApiModelProperty()
    @Column('int', {default: true})
    is_active: boolean;

    @OneToMany(type => CustomerToken, customer_token => customer_token.customer)
    customer_token: CustomerToken;

}