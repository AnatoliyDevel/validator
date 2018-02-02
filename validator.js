"use strict";

const Promise = require('bluebird');

module.exports = function (schema) {
    if (!schema)
        throw "validation schema is undefined";
    else {
        return function (input) {
            return new Promise(function (resolve, reject) {
                try {
                    const result = schema.validate(input);
                    let errorMessages = [];

                    if (result.error && result.error.details) {
                        for (let idx in result.error.details) {
                            if (result.error.details[idx].message) {
                                errorMessages.push(result.error.details[idx].message);
                            }
                        }
                    }

                    if (result.error) {
                        reject({error: result.error, errorMessages});
                    }
                    else {
                        resolve(result.value);
                    }
                }
                catch (err) {
                    reject({error: err, errorMessages: err});
                }
            });
        };
    }
};
