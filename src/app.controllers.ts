import CustomerController from './customer/customer.controller';
import ReportController from './reports/report.controller';

class AppControllers {

    private _controllers: any[] = [
        new CustomerController(),
        new ReportController()
    ];

    constructor() { }

    get controllers(): any[] {
        return this._controllers;
    }

}

export default new AppControllers();