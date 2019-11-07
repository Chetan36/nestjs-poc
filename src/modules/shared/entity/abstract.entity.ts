import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

import { AbstractDto } from '../dto/abstract.dto';
import { ApiModelProperty } from '@nestjs/swagger';

export abstract class AbstractEntity<T extends AbstractDto = AbstractDto> {

    @ApiModelProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiModelProperty()
    @CreateDateColumn({
        name: 'created_at',
    })
    createdAt: Date;

    @ApiModelProperty()
    @UpdateDateColumn({
        name: 'updated_at',
    })
    updatedAt: Date;

    // abstract dtoClass: new (entity: AbstractEntity, options?: any) => T;

    // toDto(options?: any) {
    //     return UtilsService.toDto(this.dtoClass, this, options);
    // }
}
