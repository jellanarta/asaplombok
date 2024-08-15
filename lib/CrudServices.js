const { CrudValidationSchema } = require("../validation/CrudValidation")

module.exports = class CrudServices{
    static validateCrudData(data) {
        const {error} = CrudValidationSchema.validate(data)
        return CrudServices.createError(error)
    }

    static createError(errorData){
        const response = {error:false, message:'',path:''}
        if(errorData){
            response.error = true;
            response.message = errorData.details[0].message;
            response.path = errorData.details[0].path.join('.')
        }
        return response
    }
    
    static removeSpace(data) {
        const trimmedData = {};
        for (const key in data) {
            if (typeof data[key] === 'string') {
                trimmedData[key] = data[key].trim();
            } else {
                trimmedData[key] = data[key];
            }
        }
        return trimmedData;
    }
}