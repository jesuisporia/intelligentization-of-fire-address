const controller = require('../controller');
const Newsletter = require('../../../models/newsletter');
const config = require('../../../../config')





class newslatterController extends controller {


    async index(req, res, next) {
        try {

            let page = req.query.page || 1;
            var query = {};
            var options = {
                sort: {
                    createdAt: -1
                },
                lean: true,
                page: page,
                limit: 5,
            };

            let newsletter = await Newsletter.paginate({}, options).then(function (result) {
                return result
            });

            res.render('admin/newsletter/index', {
                title: 'عضویت خبرنامه',
                newsletter
            });
        } catch (err) {
            next(err);
        }
    }

    async approved(req, res ,next) {
        try {
            let page = req.query.page || 1;
            var options = {
                // select:   'title date author',
                sort:     { createdAt: -1 },
                populate: 'post',
                lean:     true,
                // offset:   1, 
                page:page,
                limit:    5,
                // approved: true
            };
             


            let comments = await Newsletter.paginate({ approved : false } , { page , sort : { createdAt : -1 } , limit : 20 ,
                populate : [
                    {
                        path : 'post',
                        select: 'title'
                    },

                ]
            });
            res.render('admin/newsletter/approved',  { title : 'کامنت های تایید نشده' , comments });
        } catch (err) {
            next(err);
        }
    }

    async update(req ,res , next) {
        try {
            this.isMongoId(req.params.id);

            let comment = await Newsletter.findById(req.params.id).populate('belongTo').exec();
            if( ! comment ) this.error('چنین کامنتی وجود ندارد' , 404);

            await comment.belongTo.inc('commentCount');

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

            let comment = await Newsletter.findById(req.params.id).exec();
            if( ! comment ) this.error('چنین کامنتی وجود ندارد' , 404);

            // delete courses
            comment.remove();

            return this.back(req,res);
        } catch (err) {
            next(err);
        }
    }
    


    async storenewsletter(req, res, next) {
        try {
            let status = await this.validationData(req);
            if (status.length > 0){
                return res.json(status);

            }else{
                let {
                    email,
                    name,
                    phone
                } = req.body;
                let newsletter = new Newsletter({
                    email,
                    name,
                    phone
                });
                await newsletter.save();
                return res.json([])
            }

        } catch (err) {
            next(err);
        }
    }




  
}

module.exports = new newslatterController();