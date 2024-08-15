const { PrismaClient } = require("@prisma/client");
const CrudServices = require("../../../lib/CrudServices");
const { statusSchema, dueDateSchema, titleSchema, descriptionSchema } = require("../../../validation/CrudValidation");
const prisma = new PrismaClient();


module.exports = class CrudController {
    static async createTask(req, res) {
        try {
            // remove space
            const dataCrud = CrudServices.removeSpace(req.body)
            // validation data with joi
            const responseValidation = CrudServices.validateCrudData(dataCrud)
            if(responseValidation.error){
                return res.status(400).json(responseValidation)
            }
            // Ensure dueDate is a Date object
            if (typeof dataCrud.dueDate === 'string') {
                dataCrud.dueDate = new Date(dataCrud.dueDate);
            }
            // save data to table Task
            const saveData = await prisma.task.create({data:dataCrud})
            return res.json(saveData)
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async getTasks(req, res) {
        try {
            // query parameter
            const {status,dueDate} = req.query
            // query get data to task table
            const querydatabase = {
                orderBy:{
                    id:'desc'
                },
                where: {}
            }
            // validation status
            const responseStatus = statusSchema.validate(status)
            if(!responseStatus.error){
                querydatabase.where.status = status;
            }
            // validation dueDate
            const responseDueDate = dueDateSchema.validate(dueDate)
            if(!responseDueDate.error){
                querydatabase.where.dueDate = responseDueDate.value;
            }
            const dataTask = await prisma.task.findMany(querydatabase)
            return res.json(dataTask)
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getTaskById(req, res) {
        try {
            const {id} = req.params
            if(!/^\d+$/.test(id)){
                return res.status(400).json({error:true,message:'Only numbers are allowed for id.',path:'id'})
            }
            const dataTask = await prisma.task.findUnique({
                where:{
                    id:Number.parseInt(id)
                }
            })
            if(!dataTask){
                return res.status(404).json({error:true,message:`Data not found : Id ${id}`,path:'id'})
            }
            return res.json(dataTask)
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async updateTask(req, res) {
        try {
            const {id} = req.params
            if(!/^\d+$/.test(id)){
                return res.status(400).json({error:true,message:'Only numbers are allowed for id.',path:'id'})
            }
            // check if there is data
            const dataTask = await prisma.task.findUnique({
                where:{
                    id:Number.parseInt(id)
                }
            })
            if(!dataTask){
                return res.status(404).json({error:true,message:`Data not found : Id ${id}`,path:'id'})
            }
            // new data to update
            const newData = {}
            // remove space
            const dataUpdate = CrudServices.removeSpace(req.body)
            // key data to update
            const keyUpdateData = Object.keys(dataUpdate)
            
            if(!keyUpdateData.length){
                return res.status(400).json({ message: 'No data provided for update.' });
            }else{
                const validateAndUpdateField = (field,keyUpdateData,dataUpdate,schema)=>{
                    const response = {error:false, message:'',path:''}
                    if(keyUpdateData.includes(field)){
                        const { error } = schema.validate(dataUpdate[field]);
                        if (error) {
                            return { ...CrudServices.createError(error), path: field };
                        }else{
                            newData[field] = dataUpdate[field]
                            return response
                        }
                    }else{
                        return response
                    }
                }
                // title
                const titleValidation = validateAndUpdateField('title',keyUpdateData,dataUpdate,titleSchema)
                if(titleValidation.error) return res.status(400).json(titleValidation)
                // description
                const descriptionValidation = validateAndUpdateField('description',keyUpdateData,dataUpdate,descriptionSchema)
                if(descriptionValidation.error) return res.status(400).json(descriptionValidation)
                // dueDate
                const dueDateValidation = validateAndUpdateField('dueDate',keyUpdateData,dataUpdate,dueDateSchema)
                if(dueDateValidation.error){
                    return res.status(400).json(dueDateValidation)
                }else{
                    if (typeof newData.dueDate === 'string') {
                        newData.dueDate = new Date(newData.dueDate);
                    }
                }
                // status
                const statusValidation = validateAndUpdateField('status',keyUpdateData,dataUpdate,statusSchema)
                if(statusValidation.error) return res.status(400).json(statusValidation)
            }
            // update data
            const updateTask = await prisma.task.update({
                where:{
                    id:dataTask.id
                },
                data:newData
            })
            return res.json(updateTask)
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async deleteTask(req, res) {
        try {
            const {id} = req.params
            if(!/^\d+$/.test(id)){
                return res.status(400).json({error:true,message:'Only numbers are allowed for id.',path:'id'})
            }
             // check if there is data
             const dataTask = await prisma.task.findUnique({
                where:{
                    id:Number.parseInt(id)
                }
            })
            if(!dataTask){
                return res.status(404).json({error:true,message:`Data not found : Id ${id}`,path:'id'})
            }
            await prisma.task.delete({
                where:{
                    id:dataTask.id
                }
            })
            // logic untuk menghapus task
            return res.json({
                status:true,
                message :`Data with ID ${dataTask.id} has been successfully deleted.`,
                data : dataTask
            })
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

}