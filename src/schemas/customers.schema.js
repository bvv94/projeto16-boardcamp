import joi from "joi";

const customersSchema = joi.object({
    name: joi.string().required(),
    phone: joi.string().min(10).max(11).regex(/^\d+$/),
    cpf: joi.string().length(11).regex(/^\d+$/),
    birthday: joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).required()
})

export default customersSchema;