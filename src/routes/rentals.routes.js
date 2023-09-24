import { Router } from "express"
import { getRentals, createRentals, returnRental, deleteRental } from "../controllers/rentals.controllers.js"
import validadeSchema from "../middlewares/validateSchema.middleware.js"
import rentalSchema from "../schemas/rentals.schema.js"
import { validateReturn, validateNewRental, validateDelete } from "../middlewares/rental.middleware.js"

const rentalsRouter = Router()

rentalsRouter.get("/rentals", getRentals)
rentalsRouter.post("/rentals", validadeSchema(rentalSchema), validateNewRental, createRentals)
rentalsRouter.post("/rentals/:id/return", validateReturn, returnRental)
rentalsRouter.delete("/rentals/:id", validateDelete, deleteRental)

export default rentalsRouter