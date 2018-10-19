/**
 * MapleChange Inc.
 * Webhooks API - reroute function
 * Author: Interchained 2018
 */
 
 var request = require('request'),
    crypto = require('crypto'),
    MapleChange = { secretKey: '', accessKey: ''};

module.exports = MapleChange;

// Establish Webhooks API 
var WEBHOOKS = 'https://maplechange.com/webhooks/coin';

/**
* Webhooks API Functions
*/

function reroute() {
	console.log('WEBHOOKS reroute Testing...');

// For now, mock a jsonObj, later convertable to argument based or set from other parameters over url
var jsonObj;
MapleChange.reroute = function(jsonObj) {
    jsonObj = { 
        key: 'wae',
        hash: '0x12235235346'
    };
    // post request through invisible webhooks API
    request.post(WEBHOOKS, {
        form: {
            type: 'transaction',
            key: jsonObj.key,
            hash: jsonObj.hash
        }
    }, function(error, response, body) {
    // log the response from the server 
        console.log(response);
        if (error)
            throw error;
    });
};
MapleChange.reroute();
}

reroute();
