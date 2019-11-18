import * as express from 'express';

import Controller from "../common/interfaces/controller.interface";
import weatherService from '../weather/weather.service';
import CustomersNotFoundException from '../common/exceptions/CustomerNotFoundException';
import HttpException from '../common/exceptions/HttpException';
import customerService from '../customer/customer.service';
import Customer from '../customer/customer.interface';

interface CustomerReport {
    name: string;
    personOfContact: string;
    phone: string;
    location: string;
    numberOfEmployees: number;
    isWet?: boolean;
    whenRaining: number[];
}

class ReportController implements Controller {
    public path:string = '/report';
    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/raining`, this.whereIsItRaining);
        this.router.get(`${this.path}/top4`, this.top4Customers);
    }
    
    private whereIsItRaining = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const customers:any[] = await customerService.getCustomers({});
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

    private top4Customers = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const customers:any[] = await customerService.getCustomersSorted({},{"numberOfEmployees": -1}, 4);
            if (customers) {
                const top4Customers = await this.addWetProperty(customers);
                res.send(top4Customers);
            } else {
                next(new CustomersNotFoundException());
            }
        } catch(error) {
            next(new HttpException(500, `unexpected error during get users ${error}`));
        }

    }

    //private wetCustomers = async (customers: Customer[]) => {
    private wetCustomers = async (customers: any[]) => {
        let wetCustomers: CustomerReport[] = [];
        await Promise.all(customers.map(async customer => {
            const whenRaining = await weatherService.getRainForecast(customer.location);
            if (whenRaining && whenRaining.length > 0) {
                const wetCustomer:CustomerReport = { ...customer.toObject(), "whenRaining": whenRaining };
                wetCustomers.push(wetCustomer);
            }

        }));
        return wetCustomers;
    }

    //private addWetProperty = async (customers: Customer[]) => {
    private addWetProperty = async (customers: any[]) => {
        let customCustomers: Customer[] = [];
        await Promise.all(customers.map(async customer => {
            const wet:boolean = await weatherService.isRainInForecast(customer.location);
            const newCustomer: Customer = {...customer.toObject(), "isWet": wet}
            customCustomers.push(newCustomer);
        }));
        return customCustomers;
    }

}

export default ReportController;