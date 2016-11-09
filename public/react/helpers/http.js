'use strict';

const status = (response) => {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response);
    } else {
        return response.json().catch(() => {
            return Promise.reject(response);
        }).then(response => {
            return Promise.reject(response);
        });
    }
};

const json = (response) => response.json().catch(() => null);

class Http {

    get(path, query = {}, options = {}) {

        let queryString = Object.entries(query).map(entry => {

            if (entry[1] instanceof Array) {
                return entry[1].map(v => `${entry[0]}=${encodeURIComponent(v)}`).join('&');
            }

            return `${entry[0]}=${encodeURIComponent(entry[1])}`;
        }).join('&');

        if (queryString) {
            queryString = `?${queryString}`;
        }

        return fetch(`${path}${queryString}`, Object.assign({}, options, { method: 'GET' })).then(status).then(json);
    }

    post(path, body = {}, options = {}) {
        return fetch(`${path}`, Object.assign({}, options, { method: 'POST', body: JSON.stringify(body) })).then(status).then(json);
    }

    upload(path, formData, options = {}) {
        return fetch(`${path}`, Object.assign({}, options, { method: 'POST', body: formData })).then(status).then(json);
    }

    put(path, body = {}, options = {}) {
        return fetch(`${path}`, Object.assign({}, options, { method: 'PUT', body: JSON.stringify(body) })).then(status).then(json);
    }

    delete(path, options = {}) {
        return fetch(`${path}`, Object.assign({}, options, { method: 'DELETE' })).then(status).then(json);
    }
}


export default new Http();