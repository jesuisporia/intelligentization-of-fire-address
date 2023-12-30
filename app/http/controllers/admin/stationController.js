const controller = require('../controller');
const Station = require('../../../models/station');
const Role = require('../../../models/role');
const Payam = require('../../../models/payam');

const User = require('./../../../models/user')

class stationController extends controller {
    async index(req, res , next) {
        try {

            let station = await User.find({admin:true });
 
            res.render('admin/station/index', {
                title: 'لیست تمام ایستگاه ها',
                station
            });
        } catch (err) {
            next(err);
        }
    }


    async information(req, res , next) {
        try {
            let station = await User.findById(req.params.id);

            res.render('admin/station/information', {
                title: 'جزییات ایستگاه',
                station
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
        res.render('admin/station/create',{
            title:'افزودن ایستگاه'
        });
    }

    async store(req, res, next) {
        try {
            console.log('wssssssssssssssssss')


            console.log(req.body)
            let newStation = new Station({
                name : req.body.name,
                phone: req.body.phone,
                email: req.body.email,
                state : true,
                admin:true.valueOf,
                password: req.body.password,
            });

            await newStation.save(err =>{
                console.log(err)
            });
  
            return res.redirect('/admin/station');
        } catch (err) {
            next(err);
        }
    }



    async edit(req, res) {
        try {
            let user = await User.findById(req.params.id);
            let station = await User.find({
                admin: true,
                state: true
            });
            console.log(station)
            res.render('admin/station/edit', {
                title: 'ویرایش ایستگاه',
                user,
                station
            });
        } catch (err) {
            next(err);
        }
    }


    // async edit(req, res, next) {
    //     try {
    //         this.isMongoId(req.params.id);

    //         let category = await Category.findById(req.params.id);
    //         let categories = await Category.find({
    //             parent: null
    //         });
    //         if (!category) this.error('چنین دسته ای وجود ندارد', 404);


    //         return res.render('admin/categories/edit', {
    //             category,
    //             categories
    //         });
    //     } catch (err) {
    //         next(err);
    //     }
    // }

    async update(req, res, next) {
        try {


            let {
                name,
                phone,
                address,
                email
            } = req.body;
            let user = await User.findById(req.params.id);

            console.log(user)
            await User.findByIdAndUpdate(req.params.id, {
                $set: {
                name,
                phone,
                address,
                email
                }
            })

            return res.redirect('/admin/station');
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

module.exports = new stationController();