import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

class BaseModel {
    public schema: mongoose.Schema; //any
    public schemaDefinition: mongoose.SchemaDefinition;  //any;
    public schemaOptions: mongoose.SchemaOptions;    //any;

    constructor(schemaDefinition: mongoose.SchemaDefinition, schemaOptions: mongoose.SchemaOptions = {}) {
        this.schemaDefinition = schemaDefinition;
        this.schemaOptions = schemaOptions;

        this.schema = new Schema(schemaDefinition, schemaOptions);
    
        this.schema.add({
            //_createdBy: {
            //  type: SystemOrObjectId,
            //  default: "SYSTEM"
            //},
            _created: {
              type: Date,
              default: Date.now
            },
            //_updatedBy: {
            //  type: SystemOrObjectId,
            //  default: "SYSTEM"
            //},
            _updated: {
              type: Date,
              default: Date.now
            },
            _version: {
              type: Number,
              default: 0
            }
          })
    
    }

}

export default BaseModel;
