const controller = require('../controller');
const config = require('../../../../config')
const User = require('../../../models/user');
const Category = require('../../../models/category');


class categoryController extends controller {


    async index(req, res, next) {

        try {
            let page = req.query.page || 1;
            var incentivegroup = await Category.paginate({}, {
                page,
                sort: {
                    createdAt: -1
                },
                populate: 'parent'

            });
            var result = await Category.find({});

            var count = result.length;
            // res.json(reportregister)
            res.render('admin/category/index', {
                incentivegroup,
                count
            })
        } catch (err) {
            next(err)
        }
    }

    async create(req, res, next) {
        try {
            let categories = await Category.find({});

            res.render('admin/category/create', {
                categories
            })
        } catch (err) {
            next(err);
        }
    }

    async store(req, res, next) {
        try {
            console.log('aaaaaaaaaa')
            let status = await this.validationData(req);
            if (!status) return this.back(req, res);

            let {

                title,
                description,
                parent


            } = req.body;


            let newincentivegroup = new Category({

                title,
                description,
                parent: parent !== 'none' ? parent : null

            });
            await newincentivegroup.save();
            return res.redirect('/admin/category');

        } catch (err) {
            next(err);
        }
    }





    async search(req, res, next) {
        try {
            let categories = await Category.find({
                parent: null
            });

            res.render('admin/category/search', {
                categories
            })
        } catch (err) {
            next(err);
        }
    }




    async edit(req, res, next) {
        try {
            let incentivegroup = await Category.findById(req.params.id);
            let categories = await Category.find({});

            res.render('admin/category/edit', {
                incentivegroup,
                categories
            });
        } catch (err) {
            next(err);
        }
    }

    async update(req, res, next) {
        try {
            let status = await this.validationData(req);
            if (!status) return this.back(req, res);


            let {

                title,
                description
            } = req.body;

            
            await Category.findByIdAndUpdate(req.params.id, {
                $set: {
                    title,
                    description
                }
            });


            return res.redirect('/admin/category');
        } catch (err) {
            next(err);
        }
    }

    async destroy(req, res, next) {
        try {
            let incentivegroup = await Category.findById(req.params.id);
            incentivegroup.remove();
            return res.json(
                {
                    title: 'حذف شد!',
                    text: 'دسته با موفقیت حذف شد!!!',
                    icon: 'success',
                    i:1,
                })
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new categoryController();