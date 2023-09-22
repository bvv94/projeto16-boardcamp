import joi from "joi";

const rentalSchema = joi.object({
    customerId: joi.number().required(),
    gameId: joi.number().integer().positive().required(),
    daysRented: joi.number().integer().positive().required()
})

export default rentalSchema;