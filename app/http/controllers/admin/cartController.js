const controller = require('./controller');
const request = require('request-promise');
const Cart = require('../../models/cart');
const History = require('../../models/history');
const config = require('../../../config')

class cartController extends controller {


    async cart(req, res, next) {
        try {

            let page = req.query.page || 1;
            var query = {};
            var options = {
                sort: {
                    createdAt: -1
                },
                populate: 'product',
                lean: true,
                page: page,
                limit: 5,
            };

            let cart = await Cart.paginate({
                user: req.user._id
            }, options).then(function (result) {
                return result
            });

            res.render('home/dashboard/cart', {
                title: 'سبد خرید',
                cart
            });
        } catch (err) {
            next(err);
        }
    }
    


    async storecart(req, res, next) {
        try {
            let status = await this.validationData(req);
            if (!status) return this.back(req, res);
            let {
                product,
            } = req.body;
            let newCart = new Cart({
                user: req.user._id,                
                product
            });
            await newCart.save();
            return res.redirect('/cart');
        } catch (err) {
            next(err);
        }
    }



  
}

module.exports = new cartController();