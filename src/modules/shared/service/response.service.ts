import { Injectable, HttpStatus } from '@nestjs/common';
import { ResponseDto } from '../dto/response.dto';
import { Response } from 'express';

@Injectable()
export class ResponseService {

    errorResponse(status: number, message: string, res: Response){
        const errorDto: ResponseDto = {
            status: status,
            message: message,
            data: null,
            type: 'FAILURE'
        };
        return res.status(status).json(errorDto);
    }

    successResponse(status: number, message: string, data: any, res: Response){
        const responseDto: ResponseDto = {
            status: status,
            message: message,
            data: data,
            type: 'SUCCESS'
        };
        return res.status(status).json(responseDto);
    }
}
