import * as express from 'express';
import * as http from 'http';

import Customer from './customer.interface';
import CustomerModel from './customer.model';

import Controller from "../common/interfaces/controller.interface";
import customerService from './customer.service'

class CustomerController implements Controller {
    public path:string = '/customer';
    public router = express.Router();
    public customer:any = new CustomerModel();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/customers`, this.customers);
        this.router.post(this.path, this.createCustomer);
    }

    private createCustomer = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        console.log("createCustomer... body")
        console.log(request.body);
        const customerData: Customer = request.body;
        const createdPost = await customerService.createUser(customerData);
        if (createdPost) {
            response.send(createdPost);
        } else {
            //.... TBD ------> next(new HttpException(id));
        }
        
        
        
        //const createdPost = await this.customer.CustomerModel.  customerService.createUser(customerData);

        /*createdPost.save()
          .then(savedPost => {
            response.send(savedPost);
          })
          */
      }
    
    /*
    private modifyPost = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
        const id = request.params.id;
        const postData: Post = request.body;
        const post = await this.post.postModel.findByIdAndUpdate(id, postData, { new: true });
        if (post) {
          response.send(post);
        } else {
          next(new PostNotFoundException(id));
        }
    }
    */

    private customers = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        //const customerData: CreateUserDto = req.body;
        const customerData: any = req.body;
        console.dir(customerData);
        const { name, email, password } = customerData; //req.body && req.body.user;

        //res.send({"TBD": "Implement registration"});
        try {

            async function testBoolean() {
                debugger;
                if (!true) {
                    return Promise.reject({ "message": "Error: test boolean failed." });
                  }
                  return true;
            }
            

            if (await testBoolean()) {
                const user = { "email": "name@gmale.com", "name": "my name" };
                return res.json({ user }).status(200).end();
            }
        } catch(error) {
            //throw new Error(error);
            console.log("Exception occured during registration .... error: ", error);
            //next({status: 500, message: error.message})
            //next(new NotAuthorizedException());
            //next(new CustomersNotFoundException());
            res.status(500).json({ "message": "Registration Failed" });
        }
    }


    private getWeather = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        let rawData:string = "";

        try {
            const retW:string = await new Promise((resolve, reject) => {

                debugger;
                http.get('http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=a6c21efb215eadec014e43f96506fed0', (resp: any) => {
                    //let rawData:string = "";
        
                    resp.on('data', (chunk:string) => {
                        rawData += chunk;
                    }),
        
                    resp.on('end', () => {
                        resolve(rawData);
                    }),

                    resp.on('error', (error) => {
                        reject(error);
                    })
        
                })



            });
            return res.status(200).json(JSON.parse(retW)).end();

        } catch(error) {

            console.log("Exception occured getting weather .... error: ", error);
            res.status(500).json({ "message": "Get Weather Failed" });
        }
    }
}

export default CustomerController;