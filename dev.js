//EXAMPLE Market Making Bot using the graviex API

var MapleChangeAPI = require('./maplechange.js');

MapleChangeAPI.accessKey = '';
MapleChangeAPI.secretKey = '';

function mapleTest() {
	console.log('API Testing...');

	/*MapleChangeAPI.getTimestamp(function(timestamp) {
	    console.log('Verifying Timestamp...');
	    console.log(timestamp);
    });*/

	/*MapleChangeAPI.getMarkets(function(markets) {
        console.log('Verifying Markets...');
        console.log(markets);
    });*/

	/*MapleChangeAPI.getMarket('egembtc', function(marketData) {
	    console.log('Verifying individual market - BTC/EGEM');
	    console.log(marketData);
    });*/

	/*MapleChangeAPI.getAccount(function(data) {
	    console.log('Verifying account...');
	    console.log(data);
    });*/

	/*MapleChangeAPI.getCurrencyDeposits('wae', function(deposits) {
	    console.log('Getting all deposits...');
        console.log(deposits);
    });*/

	/*MapleChangeAPI.getDepositAddress('wae', function(depositAddress) {
	    console.log('Getting deposit address...');
	    console.log(depositAddress);
    });*/

	/*MapleChangeAPI.getAllOrders(function(orders) {
	    console.log('Getting all orders...');
	    console.log(orders);
    });*/

	MapleChangeAPI.getKData('vtcbtc', function(kData) {
		console.log(kData);
	});

}

mapleTest();
