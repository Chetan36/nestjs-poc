import { Module, HttpModule, Global } from '@nestjs/common';
import { StoreService } from './service/store.service';
import { ResponseService } from './service/response.service';

@Global()
@Module({
    imports: [HttpModule],
    providers: [StoreService, ResponseService],
    exports: [StoreService, ResponseService]
})
export class SharedModule { }
