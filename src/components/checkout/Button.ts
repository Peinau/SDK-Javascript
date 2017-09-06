import { CheckoutButtonRenderSettings, PaymentCallback } from "./CheckoutButtonRenderSettings";
import { Utils } from "../../index";

/**
 * Peinau Checkout Button
 * 
 * @class CheckoutButton
 */
class CheckoutButton {

	/**
	 * Render the Checkout Buttons with the specified general properties
	 * 
	 * @param {CheckoutButtonRenderSettings} settings Checkout Button Configuration
	 * @param {Array<string>} elements Array of the DOM element selectors
	 * @memberof CheckoutButton
	 */
	render(settings: CheckoutButtonRenderSettings, elements: Array<string>): void {
		let $this = this; //CheckoutButton Instance

		let buttonModel = new CheckoutButtonRenderSettings(settings);
		buttonModel
			.validate()
			.then((r) => {

				//Model Validation Success
				//buttonModel.payment("", 1);
				elements
					.forEach(selector => {

						(function () {
							//Execute The callback in click Event
							var elm = Utils.DOM.findBySelector(selector);
							var paymentMethod = elm.getAttribute("data-payment-method");
							elm.innerHTML = paymentMethod;

							Utils.Events.bind(elm, "click", (evt) => {

								elm.innerHTML = "Generando Pago...";

								settings
									.payment(paymentMethod)
									.then((paymentId) => {
										
										elm.innerHTML = paymentMethod;
										
										console.log("CALLBACK!!", paymentId)
										console.log(this);
									})
									.catch((error) => {
										
										console.log(error);
									});

							});
						})();

					});

			},
			(err) => {
				console.error("Validation Error ", buttonModel.collectErrors()[0].errors);
			});
	};
};


const Button = new CheckoutButton();
export { Button };