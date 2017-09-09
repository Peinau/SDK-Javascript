## Integrating with the Peinau REST API

If you want to use the advanced javascript integration, you will need a way to create payment tokens on your
server side. 
The simplest way to do this is using the [Peinau Payments REST API](https://developer.Peinau.com/docs/api/payments/)

The way this works is:

1. You call [Payment Create](https://developer.Peinau.com/docs/api/payments/#payment_create) to create a Payment ID, with all of your payment details
2. You invoke the Peinau Button component to get your buyer's approval for the payment, using this Payment ID

-----

### How to integrate with the REST API

1. Go to [Dev Portal / Applications](https://developer.Peinau.com/developer/applications) and create a **REST API app**, then note down your client id and secret

2. Call `api.Peinau.com/v1/oauth2/token` to get a temporary access token

   You'll need:

   - Your app client id (from step 1)
   - Your app secret (from step 1)

   ---

   ```shell
   URL='https://api.Peinau.com/v1/oauth2/token';
   CLIENT_ID='E4gg1bkY8HgPXVFuqOeQMXppxgdfJglTkYaez4tLVUnVBeRsgTpVBK9ngxGdqp7';
   SECRET='HyltbozR9LCmWfW61XrUmoMnfctxgDmnbl4WlIDX5pvipzHDB0Y65aZ72tJk7aV';

   curl "$URL" \
     --request POST \
     --user "$CLIENT_ID:$SECRET" \
     --data 'grant_type=client_credentials';
   ```

   The access token will be returned under `access_token` in the json response.

   ```json
   {
     "access_token": "89DLEZCl8IxnYLf1fdnpBoJfGZ6iOv3zcdfXjfa3o8Jdg5VBQ9fa4rD3tI6Tczn",
     "token_type": "Bearer",
     "expires_in": 32400
   }
   ```

3. Call `api.Peinau.com/v1/payments/payment` to create a transaction

   You'll need:

   - The access token (`access_token` from the response in step 2)
   - The payment details for the transaction you want to create

   ---

   ```shell
   URL='https://api.Peinau.com/v1/payments/payment';
   ACCESS_TOKEN='89DLEZCl8IxnYLf1fdnpBoJfGZ6iOv3zcdfXjfa3o8Jdg5VBQ9fa4rD3tI6Tczn';

   PAYMENT='{
     "intent": "sale",
     "redirect_urls": {
       "return_url": "http://example.com/your_redirect_url.html",
       "cancel_url": "http://example.com/your_cancel_url.html"
     },
     "payer": {
       "payment_method":"Peinau"
     },
     "transactions": [
       {
         "amount":{
           "total":"1500",
           "currency":"CLP"
         }
       }
     ]
   }';

   curl "$URL" \
     --header "Authorization: Bearer $ACCESS_TOKEN" \
     --header 'Content-type: application/json' \
     --data "$PAYMENT";
   ```

   The Payment ID will be returned under `id`:

   ```json
   {
     "id": "INPA-0J356327TH335450NK56Y2PQ",
     "intent": "sale",
     "state": "created",
     "payer": {
       "payment_method": "Peinau"
     },
     "transactions": [
       {
         "amount": {
           "total": "1500",
           "currency": "CLP"
         },
         "related_resources": []
       }
     ],
     "create_time": "2016-07-06T22:59:10Z",
     "links": [
       {
         "href": "https://api.Peinau.com/v1/payments/payment/INPA-0J356327TH335450NK56Y2PQ",
         "rel": "self",
         "method": "GET"
       },
       {
         "href": "https://api.Peinau.com/v1/payments/payment/INPA-0J356327TH335450NK56Y2PQ/pay",
         "rel": "approval_url",
         "method": "REDIRECT"
       }
     ]
   }
   ```

   Here you can see that the `id` is `INPA-0J356327TH335450NK56Y2PQ`. This is the id we need to pass back to use on our front-end.

4. Use the `Peinau.Components.CheckoutButton` component to let the buyer authorize the payment

   You'll need:

   - The Payment ID (`INPA-0J356327TH335450NK56Y2PQ` from `id` from the response in step 3)

   ---

   ```javascript
   Peinau.CheckoutButton.render({

       payment: function() {
           return new Peinau.Promise(function(resolve, reject) {

               // Call your server side to get the Payment ID from step 3, then pass it to the resolve callback (you can use Peinau http based on Axios Library)
               Peinau.sdk.http.post('https://www.my-Peinau-store.com/my-api/payment-create')
                   .done(function(data) {
                       resolve(data.paymentID);
                   });
           });
       }

   }, '#my-button-element');
   ```