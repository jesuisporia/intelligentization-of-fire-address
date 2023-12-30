const controller = require('../controller');

class daragatController extends controller {
    async index(req , res) {
        try {

            res.render('admin/daragat/index',  { title: 'درجات' });
        } catch (err) {
            next(err);
        }
    }

    async insertdarage(req , res) {
        try {

            res.render('admin/daragat/insertdarage',  { title: 'وارد کردن درجه' });
        } catch (err) {
            next(err);
        }
    }

    async inserteducation(req , res) {
        try {

            res.render('admin/daragat/inserteducation',  { title: 'وارد کردن تحصیلات' });
        } catch (err) {
            next(err);
        }
    }

    async insertsanavat(req , res) {
        try {

            res.render('admin/daragat/insertsanavat',  { title: 'وارد کردن سنوات' });
        } catch (err) {
            next(err);
        }
    }
    

    

}

module.exports = new daragatController();