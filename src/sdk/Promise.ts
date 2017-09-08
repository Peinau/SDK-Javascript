class FacadePromise<T> {
    private res: (value?: T | PromiseLike<T>) => void;
    private rej: (reason?: any) => void;
    private readonly internal_promise: Promise<T>;

    constructor(func: Function) {
        this.internal_promise = new Promise((resolve, reject) => {
            this.res = resolve;
            this.rej = reject;
        });

        //Execute the Function
        func(this.res, this.rej);
    }

    public then(
        onfulfilled?: (value: T) => T | PromiseLike<T>,
        onrejected?: (reason: any) => PromiseLike<never>
    ): Promise<T> {
        return this.internal_promise.then(onfulfilled, onrejected);
    }

    public catch(onRejected?: (reason: any) => PromiseLike<never>): Promise<T> {
        return this.internal_promise.catch(onRejected);
    }
}

export { FacadePromise };