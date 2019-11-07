import { Controller, Get } from '@nestjs/common';
import { User } from './entitiy/user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {

    constructor(private readonly userService: UserService) { }


}
