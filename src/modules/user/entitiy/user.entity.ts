import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { AbstractEntity } from "src/modules/shared/entity/abstract.entity";
import { ApiModelProperty } from "@nestjs/swagger";

@Entity()
export class User extends AbstractEntity {

    @ApiModelProperty()
    @Column()
    firstName: string;

    @ApiModelProperty()
    @Column()
    lastName: string;

    @ApiModelProperty()
    @Column()
    age: number;

    @ApiModelProperty()
    @Column()
    age2: number;
}