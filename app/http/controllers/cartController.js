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
            this.isMongoId(req.body.product);

            let status = await this.validationData(req);
            if (!status) return this.back(req, res);
            console.log(req.body.product)
            let amount;
            let cart = await Cart.find({product : req.body.product})
            if(cart.length > 0){
                await cart[0].inc('amount')
            }
            else{
                amount = 1;
                let {
                    product,
                } = req.body;
                let newCart = new Cart({
                    user: req.user._id,                
                    product,
                    amount
                    
                });
                await newCart.save();
            }

            return res.redirect('/cart');
        } catch (err) {
            next(err);
        }
    }



  
}

module.exports = new cartController();