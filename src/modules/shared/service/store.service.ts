import { Injectable, HttpService } from '@nestjs/common';

const baseUrl = 'https://api.bigcommerce.com/stores/2acctzivgs/';
const options = {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Auth-Token': "iotgfyiosfz9prq2h8xxgf9x33x83kl",
        'X-Auth-Client': "3sjsooin0j6iaj3fr7stb0v6o19yalk"
    }
}

@Injectable()
export class StoreService {
    constructor(private readonly httpService: HttpService) { }

    post(url: any, data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.httpService.post(baseUrl + url, JSON.stringify(data), options)
                .subscribe(response => { resolve(response.data.data) })
        })
    }

    get(url: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.httpService.get(baseUrl + url, options)
                .subscribe(response => { resolve(response.data) })
        })
    }
}
