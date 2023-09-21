import joi from "joi";

export const customersSchema = joi.object({
    name: joi.string().required(),
    phone: joi.string().length(11).regex(/^\d+$/),
    cpf: joi.string().length(11).regex(/^\d+$/),
    birthday: joi.date()
})