import * as Joi from 'joi';

const renderSettingsSchema = {
    payment: Joi.func().required(),
    onSuccess: Joi.func().required(),
    onError: Joi.func().required(),
    onCancel: Joi.func().required(),
    onLog: Joi.func(),
    locale: Joi.string().regex(/\w{2}-\w{2}/)
};

export { renderSettingsSchema };
