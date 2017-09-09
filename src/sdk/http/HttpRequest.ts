import * as axios from 'axios';

/**
 * Http Request
 * @class HttpRequest
 */
class Http {

    /**
     * Send a Http request with all configurations
     * @param {axios.AxiosRequestConfig} config Configuration for the request
     * @returns {axios.AxiosPromise} Promise
     * @memberof HttpRequest
     */
    public send(config: axios.AxiosRequestConfig): axios.AxiosPromise {
        return axios.default(config);
    }

    /**
     * Send a POST Http request
     * @param {axios.AxiosRequestConfig} config Configuration for the request
     * @returns {axios.AxiosPromise} Promise
     * @memberof HttpRequest
     */
    public post(config: axios.AxiosRequestConfig): axios.AxiosPromise {
        config.method = 'POST';
        return axios.default(config);
    }

    /**
     * Send a GET Http request
     * @param {axios.AxiosRequestConfig} config Configuration for the request
     * @returns {axios.AxiosPromise} Promise
     * @memberof HttpRequest
     */
    public get(config: axios.AxiosRequestConfig): axios.AxiosPromise {
        config.method = 'GET';
        return axios.default(config);
    }

    /**
     * Send a PUT Http request
     * @param {axios.AxiosRequestConfig} config Configuration for the request
     * @returns {axios.AxiosPromise} Promise
     * @memberof HttpRequest
     */
    public put(config: axios.AxiosRequestConfig): axios.AxiosPromise {
        config.method = 'PUT';
        return axios.default(config);
    }

    /**
     * Send a DELETE Http request
     * @param {axios.AxiosRequestConfig} config Configuration for the request
     * @returns {axios.AxiosPromise} Promise
     * @memberof HttpRequest
     */
    public delete(config: axios.AxiosRequestConfig): axios.AxiosPromise {
        config.method = 'DELETE';
        return axios.default(config);
    }
}

const http = new Http();
export { http };
