import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { AbstractEntity } from "src/modules/shared/entity/abstract.entity";

@Entity()
export class Otp extends AbstractEntity {

    @Column('int')
    otp: number;

    @Column('bigint')
    contact_number: number;

    @Column('datetime')
    expiry_date: Date;

    @Column({ type: 'boolean', default: false })
    is_verified: boolean;
}