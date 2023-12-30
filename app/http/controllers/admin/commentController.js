const controller = require('./../controller');
const Comment = require('./../../../models/comment');

class commentController extends controller {
    async index(req , res , next) {
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
             


            let comments = await Comment.paginate({ approved : true } , { page , sort : { createdAt : -1 } , limit : 20 ,
                populate : [
                    {
                        path : 'post',
                        select: 'title'
                    },

                ]
            });
            // return res.json(comments);
            res.render('admin/comments/index',  { title : 'کامنت ها' , comments });
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
             


            let comments = await Comment.paginate({ approved : false } , { page , sort : { createdAt : -1 } , limit : 20 ,
                populate : [
                    {
                        path : 'post',
                        select: 'title'
                    },

                ]
            });
            res.render('admin/comments/approved',  { title : 'کامنت های تایید نشده' , comments });
        } catch (err) {
            next(err);
        }
    }

    async update(req ,res , next) {
        try {
            this.isMongoId(req.params.id);

            let comment = await Comment.findById(req.params.id).populate('belongTo').exec();
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

            let comment = await Comment.findById(req.params.id).populate('belongTo').exec();
            if( ! comment ) this.error('چنین کامنتی وجود ندارد' , 404);
            
            await comment.belongTo.dic('commentCount');

            // delete courses
            comment.remove();

            return this.back(req,res);
        } catch (err) {
            next(err);
        }
    }

}

module.exports = new commentController();