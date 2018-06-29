## MapleChange NodeJS API Implementation

###### The purpose of this repository is to provide easier access to NodeJS developers when it comes to developing applications for MapleChange.

Install the npm repo:

```npm install maplechange-api```

The API uses two global variables in order to access personal data of the user. These can be generated through a user's profile page on the website. Here is a simple usage of MapleChange API.

```
var mapleAPI = require('maplechange-api');

mapleAPI.accessKey = 'YOUR_ACCESS_KEY_HERE';
mapleAPI.secretKey = 'YOUR_SECRET_KEY_HERE';

mapleAPI.getAllOrders(function(orders) {
    console.log(orders
});
```

The following is a list of all functions and API calls possible through this repository:

`getMarket(ticker, callback)` - Returns info about a market based on ticker passed.

`getMarkets(callback)` - Returns all markets.

`getTickers(callback)` - Lists all tickers.

`getAccount(callback)` - Returns info about one's personal account.

`getDeposit(transactionId, callback)` - Returns deposit information about a transaction ID.

`getCurrencyDeposits(currency, callback)` - Returns last three deposits of the given currency.

`getDepositAddress(currency, callback)` - Returns the deposit address of the given currency.

`getOrder(id, callback)` - Information about the given order based on its ID.

`getOrders(market, callback)` - Returns all the orders of a market.

`getAllOrders(callback)` - Gives data about all orders.

`createOrder(market, side, volume, price, callback)` - Creates an order.

`cancelOrder(id, callback)` - Cancel an order you've placed based on its ID.

`cancelOrdersBySide(side, callback)` - Cancel all bids or asks (side).

`cancelAllOrders(callback)` - Self-explanatory.

`getOrderBook(market, callback)` - Returns active orders of a market.

`getMarketDepth(market, callback)` - Self-explanatory.

`getMarketTrades(market, callback)` - Returns all trades on a market.

`getMyMarketTrades(market, callback)` - Return all of the user's trades on the given market.

`getKData(market, callback)` - Gives data regarding the graph.

`getTimestamp(callback)` - Returns epoch time of the API server