var express = require('express');
var TokenListModel = require('../models/tokenList');
var ConfigModel = require("../models/config"); 
var axios = require("axios");

var auctionRouter = express.Router();
auctionRouter
    .route('/getTokenList')
    .get(async function (request, response) {
        try {
            const data = await TokenListModel.find().sort({ score: 1 });
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

auctionRouter
    .route('/setScore')
    .post(async function (request, response) {
        try {
            const { selectedToken } = request.body;
            const token = await TokenListModel.findById(selectedToken._id);
            token.score = selectedToken.score * 1;
            await token.save();
            return response.status(200).send("success");
        } catch (e) {
            console.log(e)
            return response.status(503).send("failed");
        }
    })

auctionRouter
    .route('/getConfig')
    .get(async function (request, response) { 
        try {
            const data = await ConfigModel.findOne();
            return response.status(200).json(data);
        } catch (e) {
            console.log(e)
            return response.status(503).send("failed");
        }
    })

auctionRouter
    .route('/setSellPercent')
    .post(async function (request, response) {
        try {
            const { value } = request.body;
            let config = await ConfigModel.findOne();
            if (!config) {
                config = new ConfigModel();
            }
            config.sellPercent = value;

            console.log(config)
            await config.save();
            return response.status(200).send("success");
        } catch (e) {
            console.log(e)
            return response.status(503).send("failed");
        }
    })


module.exports = auctionRouter;