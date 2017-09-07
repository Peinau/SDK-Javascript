import * as Joi from 'joi';

const hateOasLink = {
    rel: Joi.string().required(),
    href: Joi.string().required(),
    method: Joi.string().required()
};

const paymentIntentionSchema = {
    id: Joi.string().guid().required(),
    links: Joi.array().items(hateOasLink)
};

export { paymentIntentionSchema };
