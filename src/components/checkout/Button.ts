import { renderSettingsSchema } from './RenderSettingsSchema';
import * as Joi from 'joi';
import { utils } from '../../index';
import { paymentIntentionSchema } from '../../api/expressCheckout/models/PaymentIntentionSchema';
import { expressCheckoutRenderer } from '../../api/expressCheckout/ExpressCheckoutRenderer';

/**
 * Peinau Checkout Button
 * @class CheckoutButton
 */
class CheckoutButton {

    /**
     * Render the Checkout Buttons with the specified general properties
     * @param {RenderSettings} settings Checkout Button Configuration
     * @param {Array<string>} elements Array of the DOM element selectors
     * @memberof CheckoutButton
     */
    public render(settings: any, elements: string[]): void {
        const $this = this; //CheckoutButton Instance

        const setting_validation = Joi.validate(settings, renderSettingsSchema);
        if (setting_validation.error) {
            //console.log(result.error);
            throw Error(JSON.stringify(setting_validation.error));
        }

        //Model Validation Success
        //buttonModel.payment("", 1);
        elements.forEach(selector => {

            (() => {
                //Execute The callback in click Event
                const elm = utils.dom.findBySelector(selector);
                const paymentMethod = elm.getAttribute('data-payment-method');
                elm.innerHTML = paymentMethod;

                utils.events.bind(elm, 'click', (evt) => {

                    elm.innerHTML = 'Generando Pago...';
                    settings
                        .payment(paymentMethod)
                        .then((intention) => {

                            const payment_validation = Joi.validate(intention, paymentIntentionSchema, { allowUnknown: true });
                            if (payment_validation.error) {
                                //console.log(result.error);
                                throw Error(JSON.stringify(payment_validation.error));
                            }

                            elm.innerHTML = paymentMethod;

                            expressCheckoutRenderer
                                .payWithConnect(intention)
                                .then((data) => {
                                    settings.onSuccess(data);
                                }, (error) => {
                                    settings.onError(error);
                                });

                        })
                        .catch((error) => {
                            //console.log(error);
                        });

                });
            })();

        });

    }
}

const button = new CheckoutButton();
export { button };