import { renderSettingsSchema } from './RenderSettingsSchema';
import { utils } from '../../index';
import { paymentIntentionSchema } from '../../api/expressCheckout/models/PaymentIntentionSchema';
import { expressCheckoutRenderer } from '../../api/expressCheckout/ExpressCheckoutRenderer';

/**
 * Peinau Checkout Button
 * @class CheckoutButton
 */
class CheckoutButton {

    /**
     * Configuration Settings
     * @type {*}
     * @memberof CheckoutButton
     */
    protected readonly settings: any;

    /**
     * HTML element binded to the button
     * @type {Element}
     * @memberof CheckoutButton
     */
    protected readonly element: Element;

    /**
     * Payment Method selected for the Checkout Button
     * @type {string}
     * @memberof CheckoutButton
     */
    protected readonly payment_method: string;

    /**
     * Creates an instance of CheckoutButton.
     * @param {*} settings settings for the configuration
     * @param {string|Element} selector selector of the element
     * @memberof CheckoutButton
     */
    constructor(settings: any, selector: string | Element) {

        //Model Validation
        if (!renderSettingsSchema.isValid(settings)) {
            //console.log(result.error);
            throw Error(JSON.stringify(renderSettingsSchema.errors));
        }

        // Add the element directly or need to find them ??
        if (selector instanceof Element) {
            this.element = <Element>selector;
        } else {
            this.element = utils.dom.findBySelector(selector);
        }

        this.settings = settings;
        this.payment_method = this.element.getAttribute('data-payment-method');

        this.render();
    }
    /**
     * Render the Checkout Buttons with the specified general properties
     * @memberof CheckoutButton
     */
    private render(): void {
        this.element.innerHTML = this.payment_method;

        //Execute The callback in click Event
        utils.events.bind(this.element, 'click', (evt) => {

            //TODO: Localize
            this.element.innerHTML = 'Generando Pago...';
            this.settings
                .payment(this.payment_method)
                .then((intention) => {

                    //Model Validation
                    if (!paymentIntentionSchema.isValid(intention)) {
                        //console.log(result.error);
                        throw Error(JSON.stringify(paymentIntentionSchema.errors));
                    }

                    this.element.innerHTML = this.payment_method;

                    expressCheckoutRenderer
                        .payWithConnect(intention)
                        .then((data) => {
                            this.settings.onSuccess(data);
                        }, (error) => {
                            this.settings.onError(error);
                        });

                })
                .catch((error) => {
                    //console.log(error);
                    this.settings.onError(error);
                });

        });

    }
}

export { CheckoutButton };