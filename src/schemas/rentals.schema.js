import joi from "joi";

export const rentalsSchema = joi.object({
    customerId: joi.number().required(),
    gameId: joi.number().integer().positive().required(),
    daysRented: joi.number().integer().positive().required()
})