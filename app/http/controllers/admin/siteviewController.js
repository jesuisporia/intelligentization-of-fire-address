const controller = require('./../controller');
const request = require('request-promise');
const Siteview = require('../../../models/siteview');
const moment = require('moment-jalaali');
moment.loadPersian({
    usePersianDigits: true
})

class siteviewController extends controller {


    async index(req, res, next) {
        try{
            var viewsite = await Siteview.find().sort({
                createdAt: -1
              }).limit(7)
              console.log(viewsite[0].viewCount)
            
            const view = [];
            const date = [];
            const realview = []
            const miladi = [];

            await viewsite.forEach(function(value){

                // test.push(value.createdAt.toLocaleDateString('fa-Ir'))
                realview.push(value.realviewCount)
                miladi.push(value.time)
                view.push(value.viewCount);
              });
            return res.json({
                label : miladi,
                data: view,
                date : miladi,
                realview : realview,
            })
        }catch(err){
            next(err)
        }
    }
    




  
}

module.exports = new siteviewController();