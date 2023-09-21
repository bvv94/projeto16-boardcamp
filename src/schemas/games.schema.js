import joi from "joi";

export const gameSchema = joi.object({
    name: joi.string().required(),
    image: joi.string().uri(),
    stockTotal: joi.number().integer().positive(),
    pricePerDay: joi.number().integer().positive()
})