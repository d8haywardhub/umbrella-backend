import * as express from 'express';

import Customer from './customer.interface';
import Controller from "../common/interfaces/controller.interface";
import customerService from './customer.service'
import CustomersNotFoundException from '../common/exceptions/CustomerNotFoundException';
import HttpException from '../common/exceptions/HttpException';

class CustomerController implements Controller {
    public path:string = '/customer';
    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/customers`, this.customers);
        this.router.post(this.path, this.createCustomer);
        this.router.patch(`${this.path}/:id`, this.modifyCustomer);         // TODO validationMiddleware(CreatePostDto, this.skipMissingProperties)
    }

    private createCustomer = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        console.log("createCustomer... body")
        console.log(req.body);
        
        try {
            const customerData: Customer = req.body;
            //throw("test catch");
            const createdCustomer = await customerService.createCustomer(customerData);
            if (createdCustomer) {
                res.send(createdCustomer);
            } else {
              next(new CustomersNotFoundException());
            }
        } catch(error) {
            next(new HttpException(500, `unexpected error during create customer ${error}`));
        }

      }
    
    private modifyCustomer = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const id = req.params.id;
            const customerData: Customer = req.body;
            //throw("test catch");
            const upatedCustomer = await customerService.updateCustomer(id, customerData);
            if (upatedCustomer) {
                res.send(upatedCustomer);
            } else {
              next(new CustomersNotFoundException());
            }
        } catch(error) {
            next(new HttpException(500, `unexpected error during update customer ${error}`));
        }

    }

    private customers = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const customers = await customerService.getCustomers({});
            if (customers) {
                res.send(customers);
                //return res.json({ user }).status(200).end();
            } else {
                next(new CustomersNotFoundException());
            }
        } catch(error) {
            next(new HttpException(500, `unexpected error during get users ${error}`));
        }
    }
}

export default CustomerController;