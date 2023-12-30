const controller = require('../controller');
const Viewpoint = require('../../../models/viewpoint');
const config = require('./../../../../config')

class viewpointController extends controller {

    async change(req, res, next) {
        try {

            let {
                comment
            } = req.body;
            await Viewpoint.findByIdAndUpdate(req.params.id, {
                $set: {
                    comment,
                    
                }
            })

            return res.redirect('/admin/viewpoint');
        } catch (err) {
            next(err);
        }
    }


    async edite(req , res , next) {
        try {
            let viewpoint = await Viewpoint.findById(req.params.id);

            if( ! viewpoint ) this.error('چنین کامنتی وجود ندارد' , 404);
             


            res.render('admin/viewpoint/edite',  { title : 'ویرایش نظر' , viewpoint });
        } catch (err) {
            next(err);
        }
    }


    async index(req , res , next) {
        try {

             
            let page = req.query.page || 1;
            var query = {};
            var options = {
                sort: {
                    createdAt: -1
                },
                populate: 'product user',
                page: page,
                limit: config.pagination
            };

            let comments = await Viewpoint.paginate({
                approved: true,
                trash:false
            }, options).then(function (result) {
                return result
            });

            res.render('admin/viewpoint/index',  { title : 'نظرات منتشر شده کاربران' , comments });
        } catch (err) {
            next(err);
        }
    }

    async approved(req, res ,next) {
        try {
            let page = req.query.page || 1;
            var query = {};
            var options = {
                sort: {
                    createdAt: -1
                },
                populate: 'product user',
                page: page,
                limit: config.pagination
            };

            let comments = await Viewpoint.paginate({
                approved: false,
                trash:false
            }, options).then(function (result) {
                return result
            });

            res.render('admin/viewpoint/approved',  { title : 'نظرات تایید نشده' , comments });
        } catch (err) {
            next(err);
        }
    }

    async trash(req, res ,next) {
        try {
            let page = req.query.page || 1;
            var query = {};
            var options = {
                sort: {
                    createdAt: -1
                },
                populate: 'product user',
                page: page,
                limit: config.pagination
            };

            let comments = await Viewpoint.paginate({
                approved: false,
                trash: true

            }, options).then(function (result) {
                return result
            });

            res.render('admin/viewpoint/trash',  { title : 'نظرات حذف شده' , comments });
        } catch (err) {
            next(err);
        }
    }
    async updatetrash(req ,res , next) {
        try {
            this.isMongoId(req.params.id);

            let comment = await Viewpoint.findById(req.params.id).populate('belongTo').exec();
            if( ! comment ) this.error('چنین کامنتی وجود ندارد' , 404);

            comment.approved = false;
            comment.trash = true;
            await comment.save();

            return this.back(req, res);

        } catch (err) {
            next(err);
        }
    }
    async untrash(req ,res , next) {
        try {
            this.isMongoId(req.params.id);

            let comment = await Viewpoint.findById(req.params.id).populate('belongTo').exec();
            if( ! comment ) this.error('چنین کامنتی وجود ندارد' , 404);

            await comment.belongTo.inc('viewpointCount');

            comment.approved = true;
            comment.trash = false;
            await comment.save();

            return this.back(req, res);

        } catch (err) {
            next(err);
        }
    }
    async update(req ,res , next) {
        try {
            this.isMongoId(req.params.id);

            let comment = await Viewpoint.findById(req.params.id).populate('belongTo').exec();
            if( ! comment ) this.error('چنین کامنتی وجود ندارد' , 404);

            await comment.belongTo.inc('viewpointCount');

            comment.approved = true;
            await comment.save();

            return this.back(req, res);

        } catch (err) {
            next(err);
        }
    }

    async destroy(req, res , next) {
        try {
            this.isMongoId(req.params.id);

            let comment = await Viewpoint.findById(req.params.id).populate('belongTo').exec();
            if( ! comment ) this.error('چنین کامنتی وجود ندارد' , 404);

            await comment.belongTo.dic('viewpointCount');


            // delete courses
            comment.remove();

            return this.back(req,res);
        } catch (err) {
            next(err);
        }
    }

}

module.exports = new viewpointController();