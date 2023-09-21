import {Router} from "express";
import { getCustomers, getIdCustomer, createCustomer, updateCustomer } from "../controllers/customers.controller.js";
import validateSchema from "../middlewares/validateSchema.middleware.js";
import customerSchema from "../schemas/customers.schema.js"

const customersRouter = Router();

customersRouter.get("/customers", getCustomers);
customersRouter.get("/customers/:id", getIdCustomer);
customersRouter.post("/customers", validateSchema(customerSchema),createCustomer);
customersRouter.put("/customers/:id", validateSchema(customerSchema),updateCustomer)

export default customersRouter;