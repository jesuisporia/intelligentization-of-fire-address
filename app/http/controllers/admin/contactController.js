const controller = require('../controller');

class contactController extends controller {
    async index(req , res) {
        try {

            res.render('admin/contact/index',  { title: 'دفترچه تلفن' });
        } catch (err) {
            next(err);
        }
    }



}

module.exports = new contactController();