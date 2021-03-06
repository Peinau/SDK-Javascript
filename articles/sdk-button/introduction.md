## Peinau Checkout Button

![Peinau Button](./images/sdk-button-0.png)

![Peinau Checkout](./images/sdk-checkout-0.png)

### Before you start

#### Create a Peinau App

1. Go to http://portal.sandbox.connect.fif.tech
2. Log in to the site with your Peinau credentials
3. Follow the instructions to create a new app
4. Make a note of your **Client ID** and **Client Secret** for both **Sandbox** and **Production**.

#### Add the Peinau Checkout Integration Script

Add the following to your html page:

```html
<script src="https://www.peinau.com/api/peinau.v1.js"  data-version-1></script>
```
### Basic Integration

This integration lets you specify all of your payment parameters all at once, to render a button onto the page.


With this integration:
- We set up the `payment` method to call our web-server, which then calls the [Peinau REST API](./../rest-api/introduction.md) to **create** a Payment ID.
- We listen for `onSuccess`, wich indicates that the payment was success by the gateway
- We listen for `onRejected`, wich indicates that the payment was rejected by the gateway
- We listen for `onCancel`, wich indicates that the payment was manually canceled by the user
- We lister for `onLog` for listening any information relevant for the merchant

You'll need:
- Your **Client ID**.
- Your **Payment Details** (see [Dev Portal](http://portal.sandbox.connect.fif.tech/#!/docs/api-docs/express-checkout/demo/pay-with-quickpay-token) for the expected json structure)
- An **HTML Container Element** to render the button into

```html
<button id="my-qpay-credit-button" data-payment-method="QUICKPAY_CREDIT">
</button>
```

```javascript
<script>
    new Peinau.components.CheckoutButton({
        // Set up a getter to create a Payment ID using the payments api, on your server side:
        payment: function() {
            return new Peinau.Promise(function(resolve, reject) {
                // Make an ajax call to get the Payment Intention (you can use Peinau http based on Axios Library). This should call your back-end,
                // which should invoke the Peinau Payment Create api to retrieve the Payment Intention.

                // When you have a Payment Intention, you need to call the `resolve` method, e.g `resolve(intention)`
                // Or, if you have an error from your server side, you need to call `reject`, e.g. `reject(err)`
                Peinau.sdk.http.post('/your-api/create-payment')
                    .then(function(intention) { 
                        resolve(intention); 
                    });            
            });
        },

        // Pass a function to be called when the customer approves the payment
        onSuccess: function(data) {

            console.log('The payment was success!');
            console.log('Payment ID = ',   data.id);
            console.log('Payment Identifier = ',   data.identifier);

            /* Go to a success page or not :P, you decide this */
        },

        // Pass a function to be called when the gateway (or an internal error) reject the payment
        onError: function(error) {

            console.error('The payment was reject!', error);

            /* Go to a error page or not :P, you decide this */
        },

        // Pass a function to be called when the customer cancels the payment
        onCancel: function(data) {

            console.log('The payment was manually canceled!');
            console.log('Payment ID = ', data.paymentID);

            /* Go to a error page?? */
        }

         // Pass a function to be called when component send a log info
        onLog: function(data) { 

            console.log('Message Log = ', data);
        }

    },'#my-qpay-credit-button');
</script>
```

### Customizing the Button

You can change the look and feel of the button, using the `style` parameter, and language of the button using `locale` parameter:

```javascript
new Peinau.components.CheckoutButton({

    ...
    // Specify the language displayed on your button
    locale: 'es-CL',

    // Specify the style of your button

    style: {
        size:   'medium', // tiny, small, medium
        color:  'green', // green, blue, white
        shape:  'pill'    // pill, rect
    }

}, '#my-qpay-credit-button');
```

-----

> **Live Demo**: 
> If you can't wait for test!: 
> https://rawgit.com/Peinau/peinau-javascript/master/demo/index.html
