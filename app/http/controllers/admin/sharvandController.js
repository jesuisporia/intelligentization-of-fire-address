const controller = require('../controller');

class sharvandController extends controller {
    async index(req , res) {
        try {

            res.render('admin/shahrvand/index',  { title: 'لیست شهروندان مسئول' });
        } catch (err) {
            next(err);
        }
    }



}

module.exports = new sharvandController();