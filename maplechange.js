/**
 * MapleChange Inc.
 * API Implementation
 * Author: Flavius P. 2018
 */

var request = require('request'),
	crypto = require('crypto'),
	MapleChange = {};

module.exports = MapleChange;

/**
 * Global Variables
 */

var API = 'https://maplechange.com/api/v2/';

/**
 * Core API Functions
 */

MapleChange.getTonce = function() {
	return new Date().getTime();
};

MapleChange.request = function(uri, callback) {
	request.get(API + uri, function(error, response, body) {
	    if (error)
	        throw error;

		callback(body);
	});
};

MapleChange.postRequest = function(uri, signature, callback) {
	request.post(API + uri, {
		form: {
			signature: signature
		}
	}, function(error, response, body) {
	    if (error)
	        throw error;

		callback(body);
	});
};

MapleChange.generateSignature = function(requestType, uri, extra, callback, withoutTonce) {
    var payload;

    if (withoutTonce)
        payload = requestType + '|' + uri + '|' + extra;
    else {
        var tonce = MapleChange.getTonce();
        payload = requestType + '|' + uri + '|access_key=' + MapleChange.accessKey + extra + '&tonce=' + tonce;
    }

    var hash = crypto.createHmac('sha256', MapleChange.secretKey).update(payload).digest('hex');

    if (withoutTonce)
        callback(hash);
    else
	    callback(hash, tonce);
};


/**
 * Primary API Functions
 */

MapleChange.getMarket = function(ticker, callback) {
    var uri = 'tickers/' + ticker;

    MapleChange.request(uri, function(result) {
        callback(JSON.parse(result));
    });
};

MapleChange.getMarkets = function(callback) {
    MapleChange.generateSignature('GET', '/api/v2/markets', '', function(signature, tonce) {
        var uri = 'markets?access_key=' + MapleChange.accessKey + '&tonce=' + tonce + '&signature=' + signature;

        MapleChange.request(uri, function(result) {
            callback(JSON.parse(result));
        });

    });

};

MapleChange.getTickers = function(callback) {
    var uri = 'tickers';

    MapleChange.request(uri, function(result) {
        callback(JSON.parse(result));
    });
};

MapleChange.getAccount = function(callback) {
    MapleChange.generateSignature('GET', '/api/v2/members/me', '', function(payloadHash, tonce) {
        var uri = 'members/me?access_key=' + MapleChange.accessKey + '&tonce=' + tonce + '&signature=' + payloadHash;

        MapleChange.request(uri, function(result) {
            callback(JSON.parse(result));
        });
    });
};

MapleChange.getDeposit = function(transactionId, callback) {
    MapleChange.generateSignature('GET', '/api/v2/deposit', '&txid=' + transactionId, function(payloadHash, tonce) {
        var uri = 'deposit?access_key=' + MapleChange.accessKey + '&txid=' + transactionId + '&tonce=' + tonce + '&signature=' + payloadHash;

        MapleChange.request(uri, function(result) {
            callback(JSON.parse(result));
        });
    });
};

/**
 * Returns last three deposits
 * associated with the account.
 */

MapleChange.getCurrencyDeposits = function(currency, callback) {
    MapleChange.generateSignature('GET', '/api/v2/deposits', '&currency=' + currency, function(payloadHash, tonce) {
        var uri = 'deposits?access_key=' + MapleChange.accessKey + '&currency=' + currency + '&tonce=' + tonce + '&signature=' + payloadHash;

        MapleChange.request(uri, function(result) {
            callback(JSON.parse(result));
        });
    });
};

/**
 * Useless function. Will be deprecated.
 */

MapleChange.getAllDeposits = function(callback) {
    MapleChange.generateSignature('GET', '/api/v2/deposits', '', function(payloadHash, tonce) {
        var uri = 'deposits?access_key=' + MapleChange.accessKey + '&tonce=' + tonce + '&signature=' + payloadHash;

        MapleChange.request(uri, function(result) {
            callback(JSON.parse(result));
        });
    });
};

MapleChange.getDepositAddress = function(currency, callback) {
    MapleChange.generateSignature('GET', '/api/v2/deposit_address', '&currency=' + currency, function(payloadHash, tonce) {
        var uri = 'deposit_address?access_key=' + MapleChange.accessKey + '&currency=' + currency + '&tonce=' + tonce + '&signature=' + payloadHash;

        MapleChange.request(uri, function(result) {
            callback(JSON.parse(result));
        });
    });
};

MapleChange.getOrder = function(id, callback) {
    MapleChange.generateSignature('GET', '/api/v2/order', '&id=' + id, function(payloadHash, tonce) {
        var uri = 'order?access_key=' + MapleChange.accessKey + '&id=' + id + '&tonce=' + tonce + '&signature=' + payloadHash;

        MapleChange.request(uri, function(result) {
            callback(JSON.parse(result));
        });
    });
};

MapleChange.getOrders = function(market, callback) {
    MapleChange.generateSignature('GET', '/api/v2/orders', '&market=' + market, function(payloadHash, tonce) {
        var uri = 'orders?access_key=' + MapleChange.accessKey + '&market=' + market + '&tonce=' + tonce + '&signature=' + payloadHash;

        MapleChange.request(uri, function(result) {
            callback(JSON.parse(result));
        });
    });
};

MapleChange.getAllOrders = function(callback) {
    MapleChange.generateSignature('GET', '/api/v2/orders', '&market=all', function(payloadHash, tonce) {
        var uri = 'orders?access_key=' + MapleChange.accessKey + '&market=all' + '&tonce=' + tonce + '&signature=' + payloadHash;

        MapleChange.request(uri, function(result) {
            callback(JSON.parse(result));
        });
    });
};

MapleChange.createOrder = function(market, side, volume, price, callback) {
    var tonce = MapleChange.getTonce(),
        query = 'access_key=' + MapleChange.accessKey + '&market=' + market + '&price=' + price + '&side=' + side + '&tonce=' + tonce + '&volume=' + volume;

    MapleChange.generateSignature('POST', '/api/v2/orders', query, function(payloadHash) {
        var uri = 'orders?' + query;

        MapleChange.postRequest(uri, payloadHash, function(result) {
            callback(JSON.parse(result));
        });

    }, true);
};

MapleChange.cancelOrder = function(id, callback) {
    var tonce = MapleChange.getTonce(),
        query = 'access_key=' + MapleChange.accessKey + '&id=' + id + '&tonce=' + tonce;

    MapleChange.generateSignature('POST', '/api/v2/order/delete', query, function(payloadHash) {
        var uri = 'order/delete?' + query;

        MapleChange.postRequest(uri, payloadHash, function(result) {
            callback(JSON.parse(result));
        });

    }, true);
};

MapleChange.cancelOrdersBySide = function(side, callback) {
    var tonce = MapleChange.getTonce(),
        query = 'access_key=' + MapleChange.accessKey + '&side=' + side + '&tonce=' + tonce;

    MapleChange.generateSignature('POST', '/api/v2/orders/clear', query, function(payloadHash) {
        var uri = 'orders/clear?' + query;

        MapleChange.postRequest(uri, payloadHash, function(result) {
            callback(JSON.parse(result));
        });
    }, true);
};

MapleChange.cancelAllOrders = function(callback) {
    var tonce = MapleChange.getTonce(),
        query = 'access_key=' + MapleChange.accessKey + '&tonce=' + tonce;

    MapleChange.generateSignature('POST', '/api/v2/orders/clear', query, function(payloadHash) {
        var uri = 'orders/clear?' + query;

        MapleChange.postRequest(uri, payloadHash, function(result) {
            callback(JSON.parse(result));
        });
    });
};

MapleChange.getOrderBook = function(market, callback) {
    MapleChange.generateSignature('GET', '/api/v2/order_book', '&market=' + market, function(payloadHash, tonce) {
        var uri = 'order_book?access_key=' + MapleChange.accessKey + '&market=' + market + '&tonce=' + tonce + '&signature' + payloadHash;

        MapleChange.request(uri, function(result) {
            callback(JSON.parse(result));
        });
    });

};

MapleChange.getMarketDepth = function(market, callback) {
    MapleChange.generateSignature('GET', '/api/v2/depth', '&market=' + market, function(payloadHash, tonce) {
        var uri = 'depth?access_key=' + MapleChange.accessKey + '&market=' + market + '&tonce=' + tonce + '&signature=' + payloadHash;

        MapleChange.request(uri, function(result) {
            callback(JSON.parse(result));
        });
    });

};

MapleChange.getMarketTrades = function(market, callback) {
    MapleChange.generateSignature('GET', '/api/v2/trades', '&market=' + market, function(payloadHash, tonce) {
        var uri = 'trades?access_key=' + MapleChange.accessKey + '&market=' + market + '&tonce=' + tonce + '&signature=' + payloadHash;

        MapleChange.request(uri, function(result) {
            callback(JSON.parse(result));
        });
    });
};

MapleChange.getMyMarketTrades = function(market, callback) {
    MapleChange.generateSignature('GET', '/api/v2/trades/my', '&market=' + market, function(payloadHash, tonce) {
        var uri ='trades/my?access_key=' + MapleChange.accessKey + '&market=' + market + '&tonce=' + tonce + '&signature=' + payloadHash;

        MapleChange.request(uri, function(result) {
            callback(JSON.parse(result));
        });
    });
};

MapleChange.getKData = function(market, callback) {
    MapleChange.generateSignature('GET', '/api/v2/k', '&market=' + market, function(payloadHash, tonce) {
        var uri = 'k?access_key=' + MapleChange.accessKey + '&market=' + market + '&tonce=' + tonce + '&signature=' + payloadHash;

        MapleChange.request(uri, function(result) {
            callback(JSON.parse(result));
        });
    });
};

MapleChange.getTimestamp = function(callback) {
    var uri = 'timestamp';

    MapleChange.request(uri, function(result) {
        callback(JSON.parse(result));
    });
};













