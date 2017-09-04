Peinau Checkout
---------------

#### [Try it in our Demo App](https://quickpay-connect-checkout-web.azurewebsites.net)
#### [Learn more in our Dev Docs](https://github.com/Peinau/peinau-dev-portal)

-----

### Which Integration is right for me?

- Do you want a button which gives you **finely grained control** over your transaction; creating and finalizing transactions from your server
  side using Peinau's REST api? If so you should use the [**Advanced Javascript Integration**](https://github.com/Peinau/Peinau-checkout/tree/master/docs/button.md#advanced-integration), which will allow you to create
  and finalize the transaction yourself on your server side using the [Peinau Payments REST API](./articles/rest-api/introduction.md).

- Do you use **Shopify, Vtex or Ember.js** to render your e-commerce? If so, you should use the [**Shopify, Vtex or Ember.js Elements**](https://github.com/Peinau/peinau-vtex),
  which provide native support for each of these frameworks, so you can drop Peinau Buttons in any of your front-end views.

## Usage

1. Add `peinau.v1.js` to your page:

   ```html
   <script src="https://www.peinau.com/api/peinau.v1.js" data-version-1></script>
   ```


## [Peinau Checkout Button](articles/sdk-button/introduction.md)

![Peinau Checkout](./articles/sdk-button/images/sdk-button-0.png)

This component renders a Peinau button onto your page, which will take care of opening up Peinau for you and guiding your customer through the payment process. After the payment is complete, we will notify you using a javascript callback, and you can take your customer to a success page.

[Integrate the button component](articles/sdk-button/introduction.md)

-----

## Integrating with the Peinau REST API

If you want to use the advanced javascript integrations, you will need a way to create payment tokens on your server side. The simplest way to do this is using the [Peinau Payments REST API](./articles/rest-api/introduction.md)

### [Integrating with the Peinau REST API](./articles/rest-api/introduction.md)

-----

## Development

Please feel free to follow the [Contribution Guidelines](./articles/CONTRIBUTING.md) to contribute to this repository. PRs are welcome, but for major changes please raise an issue first.


### Debugging messages

To enable output of additional debugging messages to the console, set the `data-log-level` attribute of the script element to e.g. `info` (default value is `warn`):

   ```html
   <script src="https://www.peinau.com/api/peinau.v1.js" data-version-1 data-log-level="info"></script>
   ```
