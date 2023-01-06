import * as Joi from "joi"; //Ojo para este paquete es requerido ponerlo asi, si se hace de la manera tradicional no funciona ---MANERA TRADICIONAL: import Join from "joi";---

export const JoiValidationSchema = Joi.object({
    MONGODB: Joi.required(),
    PORT: Joi.number().default(3005),
    DEFAULT_LIMIT: Joi.number().default(6),

})