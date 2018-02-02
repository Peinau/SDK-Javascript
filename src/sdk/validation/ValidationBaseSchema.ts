import { ValidatorResult, ValidationError } from 'jsonschema/lib';
import { Validator } from 'jsonschema';

/**
 * Validation Schema Base for model validation (use Json Schema draft 4/6)
 *   Draft: http://json-schema.org/
 * @export
 * @class ValidationBaseSchema
 * @extends {Validator}
 */
export class ValidationBaseSchema extends Validator {
    private schema: {};
    private cacheError: ValidationError[];

    /**
     * Creates an instance of ValidationBaseSchema.
     * @param {{}} json_schema JSON Schema [Draft: http://json-schema.org/]
     * @memberof ValidationBaseSchema
     */
    constructor(json_schema: {}) {
        super();
        this.schema = json_schema;

        this.attachCustomAttributes();
    }

    /**
     * Check if a a variable is not undefined or null (useful for empty string or zero)
     * @private
     * @template T Variable tupe to check
     * @param {(T | null | undefined)} obj Variable to check
     * @returns {boolean} Return if not null or undefined
     * @memberof ValidationBaseSchema
     */
    private notNullOrUndefined<T>(obj: T | null | undefined): boolean {
        return !(typeof obj === 'undefined' || obj === null);
    }

    /**
     * Add Custom Attributes for the jsonschema validation
     * @private
     * @memberof ValidationBaseSchema
     */
    private attachCustomAttributes(): void {

        /** Check if a attribute is a function */
        this.attributes.isfunction = (instance, schema, options, ctx) => {
            const result = new ValidatorResult(instance, schema, options, ctx);
            const property = ctx.propertyPath.replace('instance.', '');
            if ((<any>this.schema).required.indexOf(property) >= 0 && this.notNullOrUndefined(instance)) {
                if (!(instance instanceof Function)) {
                    result.addError(`${property} expects a function`);
                }
            }
            return result;
        };
    }

    /**
     * Run the validation process and return if the validation pass OK or fail
     * @param {*} instance Model to validate
     * @returns {boolean}
     * @memberof ValidationBaseSchema
     */
    public isValid(instance: any): boolean {
        this.cacheError = null;
        const validation_result = super.validate(instance, this.schema);
        if (!validation_result.valid) {

            //Convert to more readable object :P
            const messages = [];
            validation_result.errors.forEach(error => {
                messages.push(error.message);
            });

            this.cacheError = messages;
            return false;
        }
        return true;
    }

    /**
     * Get the error list associated with the last validation
     * @readonly
     * @memberof ValidationBaseSchema
     */
    public get errors() {
        return this.cacheError;
    }
}