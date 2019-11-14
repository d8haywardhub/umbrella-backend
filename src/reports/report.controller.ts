import * as express from 'express';
//import * as http from 'http';

import Controller from "../common/interfaces/controller.interface";
import weatherService from '../weather/weather.service';
import CustomersNotFoundException from '../common/exceptions/CustomerNotFoundException';
import HttpException from '../common/exceptions/HttpException';
import customerService from '../customer/customer.service';
import Customer from '../customer/customer.interface';

class ReportController implements Controller {
    public path:string = '/report';
    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/whereraining`, this.whereIsItRaining);
    }
    
    private whereIsItRaining = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const customers = await customerService.getCustomers({});
            if (customers) {
                const wetCustomers = await this.wetCustomers(customers);
                res.send(wetCustomers);
            } else {
                next(new CustomersNotFoundException());
            }
        } catch(error) {
            next(new HttpException(500, `unexpected error during get users ${error}`));
        }

    }

    private wetCustomers = async (customers: Customer[]) => {
        let wetCustomers: Customer[] = [];
        await Promise.all(customers.map(async customer => {
            const wet = await weatherService.isRainInForecast(customer.location);
            if (wet) {
                wetCustomers.push(customer);
            }
        }));
        return wetCustomers;
    }

}

export default ReportController;