import { Router } from "express"
import { getRentals, createRentals, returnRental, deleteRental } from "../controllers/rentals.controllers.js"
import validadeSchema from "../middlewares/validateSchema.middleware.js"
import rentalSchema from "../schemas/rentals.schema.js"

const rentalsRouter = Router()

rentalsRouter.get("/rentals", getRentals)
rentalsRouter.post("/rentals", validadeSchema(rentalSchema), createRentals)
rentalsRouter.post("/rentals/:id/return", returnRental)
rentalsRouter.delete("/rentals/:id", deleteRental)

export default rentalsRouter