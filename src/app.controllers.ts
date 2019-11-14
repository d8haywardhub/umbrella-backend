import CustomerController from './customer/customer.controller';

class AppControllers {

    private _controllers: any[] = [
        //new PostController(),
        new CustomerController()
    ];

    constructor() { }

    get controllers(): any[] {
        return this._controllers;
    }

}

export default new AppControllers();