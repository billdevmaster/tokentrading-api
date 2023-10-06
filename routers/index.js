var express = require('express');
var TokenListModel = require('../models/tokenList');
var axios = require("axios");

var auctionRouter = express.Router();
auctionRouter
    .route('/getTokenList')
    .get(async function (request, response) {
        try {
            const data = await TokenListModel.find();
            return response.status(200).json({data: data});
        } catch (e) {
            console.log(e)
            return response.status(503).send("failed");
        }
    })

auctionRouter
    .route('/buyToken')
    .post(async function (request, response) {
        try {
            const { tokenId, current_price } = request.body;
            const token = await TokenListModel.findOne({ id: tokenId });
            token.status = "bought";
            token.buy_price = current_price;
            token.current_price = current_price;
            await token.save();
            return response.status(200).send("success");
        } catch (e) {
            console.log(e)
            return response.status(503).send("failed");
        }
    })

auctionRouter
    .route('/sellToken')
    .post(async function (request, response) {
        try {
            const { tokenId, current_price } = request.body;
            const token = await TokenListModel.findOne({ id: tokenId });
            token.status = "sold";
            token.sell_price = current_price;
            token.current_price = current_price;
            await token.save();
            return response.status(200).send("success");
        } catch (e) {
            console.log(e)
            return response.status(503).send("failed");
        }
    })


module.exports = auctionRouter;