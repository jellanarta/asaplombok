const multer = require("multer")
const CrudController = require("./controller/CrudController")
const crudRouter = require("express").Router()

crudRouter.post('/tasks',multer().none(),CrudController.createTask)
crudRouter.get('/tasks',CrudController.getTasks)
crudRouter.get('/tasks/:id',CrudController.getTaskById)
crudRouter.put('/tasks/:id',CrudController.updateTask)
crudRouter.delete('/tasks/:id',CrudController.deleteTask)

module.exports=crudRouter