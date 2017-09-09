import { ValidationBaseSchema } from '../../../sdk/validation/ValidationBaseSchema';

const paymentIntentionSchema = new ValidationBaseSchema({
    type: 'object',
    properties: {
        id: {
            type: 'string'
        },
        //HATE OAS LINK
        links: {
            type: 'array',
            minItems: 1,
            items: {
                type: 'object',
                properties: {
                    rel: {
                        type: 'string'
                    },
                    href: {
                        type: 'string'
                    },
                    method: {
                        type: 'string'
                    }
                },
                required: ['rel', 'href', 'method']
            },
            uniqueItems: true
        }
    },
    required: ['id', 'links']
});

export { paymentIntentionSchema };
