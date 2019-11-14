import * as mongoose from 'mongoose';
import BaseModel from '../common/models/BaseModel'
import Customer from './customer.interface';
import { customerSchemaDefinition, customerSchemaOptions } from './customer.modeldefinition';

class CustomerModel extends BaseModel {

    constructor() {
        super(customerSchemaDefinition, customerSchemaOptions);
    }

    private _customerModel = mongoose.model<Customer & mongoose.Document>('Customer', this.schema);

    get customerModel(): any {
        return this._customerModel;
    }
}
  
export default CustomerModel;