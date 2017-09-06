import { Model } from 'rawmodel';
import { isFunction, isUndefined, isPresent, isArray, toArray, isValue, cast } from 'typeable';
import { Deferred } from "../../Deferred";


// defining a basic model


type PaymentCallback = (paymentMethod: string) => Deferred<void>;
class CheckoutButtonRenderSettings extends Model {
    public payment: PaymentCallback;


    public constructor(data = <any>{}) {
        super(data);

        this.defineValidator('isFunction', function (v) {
            return isFunction(data.payment);
        });

        this.defineField('payment', {
            type: Function,
            validate: [ // field validation setup
                { // validator recipe
                    validator: 'isFunction', // validator name
                    message: 'payment callback must be present', // error message
                }
            ]
        });

        // [https://github.com/xpepermint/rawmodeljs/issues/18]
        // this.populate(data); 
    }
};

export { PaymentCallback, CheckoutButtonRenderSettings };