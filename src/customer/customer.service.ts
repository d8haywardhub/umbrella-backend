import Customer from './customer.interface';
import CustomerModel from './customer.model';

class CustomerService {

    public customer:CustomerModel = new CustomerModel();

    constructor() { }

    public getCustomer = async (email: string): Promise<Customer> => {
        debugger;
        return this.customer.customerModel.findOne({"email": email})
    }

    public getCount = async (email: string): Promise<number> => {
        return this.customer.customerModel.count({"email": email})
    }

    public createUser = async (customerData: any): Promise<Customer> => {
        const newCustomer:Customer = customerData;
        const createdCustomer = await this.customer.customerModel.create(newCustomer);
        const savedCustomer = await createdCustomer.save();
        return savedCustomer;
        //.then(savedPost => {
        //  response.send(savedPost);
        //})
       
       
       
        //return this.customer.customerModel.create(newUser);
    }
}
const customerService = new CustomerService();

export default customerService;