const controller = require('./../controller');
const User = require('./../../../models/user');
const Role = require('./../../../models/role');
const Payam = require('./../../../models/payam');

class userController extends controller {
    async index(req, res , next) {
        try {
            let page = req.query.page || 1;
            var query = {};
            var options = {
                // select:   'title date author',
                sort: {
                    createdAt: -1
                },
                populate: 'roles',
                lean: true,
                // offset:   1, 
                page: page,
                limit: 5,
                // approved: true
            };

            let posts = await User.paginate({}, options).then(function (result) {
                return result
            });

            // console.log(posts)
            
            
            
            // let page = req.query.page || 1;
            // let posts = await User.paginate({} , { page , sort : { createdAt : 1 } , limit : 20 });

            res.render('admin/users/index', {
                title: 'کاربران سایت',
                posts
            });
        } catch (err) {
            next(err);
        }
    }






    async createpayam(req, res) {
        try {
            this.isMongoId(req.params.id);

            let user = await User.findById(req.params.id);

            res.render('admin/users/sendpayam', {
                title: 'ارسال پیام',
                user
            });
        } catch (err) {
            next(err);
        }
    }


    async sendpayam(req, res, next) {
        try {

            // this.isMongoId(req.params.id);
            // let status = await this.validationData(req);
            // if(! status) return this.back(req,res);

            let {
                payam,
                user
            } = req.body;

            let newUser = new Payam({
                payam,
                user
            });

            await newUser.save();

            return res.redirect('/admin/users');
        } catch (err) {
            next(err);
        }
    }
 
    async toggleadmin(req, res, next) {
        try {
            this.isMongoId(req.params.id);

            let user = await User.findById(req.params.id);

            await  User.update(
                { _id:  req.params.id },
                { $set: { "admin": ! user.admin } }
             )
            return this.back(req, res);
        } catch (err) {
            next(err)
        }
    }

    async addrole(req, res, next) {
        try {
            this.isMongoId(req.params.id);

            let user = await User.findById(req.params.id);
            let roles = await Role.find({});
            if (!user) this.error('چنین کاربری وجود ندارد', 404);

            res.render('admin/users/addrole', {
                user,
                roles
            });
        } catch (err) {
            next(err);
        }
    }

    async storeRoleForUser(req, res, next) {
        try {
            this.isMongoId(req.params.id);

            let user = await User.findById(req.params.id);
            if (!user) this.error('چنین کاربری وجود ندارد', 404);

            user.set({
                roles: req.body.roles
            });
            await user.save();

            res.redirect('/admin/users');
        } catch (err) {
            next(err);
        }
    }

    async create(req, res) {
        res.render('admin/users/create');
    }

    async store(req, res, next) {
        try {
            let status = await this.validationData(req);
            if (!status) return this.back(req, res);

            let {
                name,
                email,
                password
            } = req.body;

            let newUser = new User({
                name,
                email,
                password
            });

            await newUser.save();

            return res.redirect('/admin/users');
        } catch (err) {
            next(err);
        }
    }

    async edit(req, res, next) {
        try {
            this.isMongoId(req.params.id);

            let category = await Category.findById(req.params.id);
            let categories = await Category.find({
                parent: null
            });
            if (!category) this.error('چنین دسته ای وجود ندارد', 404);


            return res.render('admin/categories/edit', {
                category,
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
                name,
                parent
            } = req.body;

            await Category.findByIdAndUpdate(req.params.id, {
                $set: {
                    name,
                    slug: this.slug(name),
                    parent: parent !== 'none' ? parent : null
                }
            })

            return res.redirect('/admin/categories');
        } catch (err) {
            next(err);
        }
    }

    async destroy(req, res, next) {
        try {
            this.isMongoId(req.params.id);

            let user = await User.findById(req.params.id);
            if (!user) this.error('چنین کاربری وجود ندارد', 404);


            // delete user
            user.remove();

            return res.redirect('/admin/users');
        } catch (err) {
            next(err);
        }
    }

}

module.exports = new userController();