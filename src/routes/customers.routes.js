import { Router } from "express";
import { getCustomers, getIdCustomer, createCustomer, updateCustomer } from "../controllers/customers.controller.js";
import validateSchema from "../middlewares/validateSchema.middleware.js";
import customersSchema from "../schemas/customers.schema.js"
import { validateCustomer, validateUpdate } from "../middlewares/customer.middleware.js";

const customersRouter = Router();

customersRouter.get("/customers", getCustomers);
customersRouter.get("/customers/:id", getIdCustomer);
customersRouter.post("/customers", validateSchema(customersSchema), validateCustomer, createCustomer);
customersRouter.put("/customers/:id", validateSchema(customersSchema), validateUpdate ,updateCustomer)

export default customersRouter;