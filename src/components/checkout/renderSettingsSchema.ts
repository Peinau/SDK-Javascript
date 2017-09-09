import { ValidationBaseSchema } from '../../sdk/validation/ValidationBaseSchema';

const renderSettingsSchema = new ValidationBaseSchema({
    type: 'object',
    properties: {
        payment: { isfunction: true },
        onSuccess: { isfunction: true },
        onError: { isfunction: true },
        onCancel: { isfunction: true },
        onLog: { isfunction: true },
        locale: { type: 'string' }
    },
    required: ['payment', 'onSuccess', 'onError', 'onCancel']
});
export { renderSettingsSchema };