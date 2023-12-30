const controller = require('./../controller');

class widgetController extends controller {
    async index(req , res) {
        try {

            res.render('admin/widget/index',  { title: 'title' });
        } catch (err) {
            next(err);
        }
    }



}

module.exports = new widgetController();