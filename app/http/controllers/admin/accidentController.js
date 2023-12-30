const controller = require('../controller');
const User = require('../../../models/user')
const Role = require('../../../models/role')
const ReportRegistration = require('../../../models/reportRegistration')
const path = require('path');
const sharp = require('sharp');



class accidentController extends controller {
    async index(req, res , next) {
        try {
            let user = await User.find({
                admin: true,
                manager: true
            }).sort({
                createdAt: -1
            })

            res.render('admin/accident/index', {
                title: 'واحد حوادث',
                user
            });
        } catch (err) {
            next(err);
        }
    }

    async residential(req, res , next) {
        try {
            res.render('admin/accident/residential', {
                title: 'افزودن حادثه مسکونی'
            });
        } catch (err) {
            next(err);
        }
    }


    async information(req, res , next) {
        try {
            let page = req.query.page || 1 ;

            let fireman = await User.findById(req.params.id);
            let reportinformation = await ReportRegistration.paginate({"fireman" : {$in:[req.params.id]}} , {page , sort:{createdAt : -1} , limit:10})
            
            let lastreportinformation = await ReportRegistration.find({
                "fireman" : {$in:[req.params.id]}
            }).sort({createdAt : -1}).limit(-1)
            var count = reportinformation.docs.length;

            res.render('admin/fireman/information', {
                title: 'جزئیات آتش نشان',
                fireman,
                lastreportinformation,
                count,
                reportinformation
            });
        } catch (err) {
            next(err);
        }
    }

    async create(req, res) {
        try {
            res.render('admin/manager/create', {
                title: 'افزودن کاربر '
            });
        } catch (err) {
            next(err);
        }
    }


    async graphics(req, res) {
        res.render('admin/manager/graphics')
    }

    async edit(req, res) {
        try {
            let user = await User.findById(req.params.id);
            let station = await User.find({
                admin: true,
                state: true
            });
            console.log(station)
            res.render('admin/manager/edit', {
                title: 'ویرایش آتش نشان',
                user,
                station
            });
        } catch (err) {
            next(err);
        }
    }

    async store(req, res, next) {
        try {
            let images = this.imageResize(req.file);
            console.log(images)
            let newUser = new User({
                name: req.body.name,
                admin: true,
                manager:true,
                address: req.body.address,
                phone: req.body.phone,
                melicode: req.body.melicode,
                personalcode: req.body.personalcode,
                picture: images,
                thumb: images[480],
                email: req.body.personalcode + '@gmail.com',
                password: req.body.password,
            });

            await newUser.save(err => {
                console.log(err)
            });
            res.redirect('/admin/manager');
        } catch (err) {
            next(err);
        }
    }

    async toggleadmin(req , res , next) {
        try {

            let user = await User.findById(req.params.id);
            user.set({ admin : ! user.admin});
            await user.save();

            return this.back(req , res);
        } catch (err) {
            next(err)
        }
    }
    async addrole(req , res ,next) {
        try {
            let user = await User.findById(req.params.id);
            let roles = await Role.find({});
            console.log(user)
            res.render('admin/manager/addrole', { user , roles });            
        } catch (err) {
            next(err);
        }
    }

    async storeRoleForUser(req , res , next) {
        try {

            let user = await User.findById(req.params.id);

            user.set({ roles : req.body.roles });
            await user.save();

            res.redirect('/admin/manager');
        } catch (err) {
            next(err);
        }
    }
    async destroy(req, res, next) {
        try {

            let user = await User.findById(req.params.id);
            if (!user) this.error('چنین کاربری وجود ندارد', 404);


            // delete user
            user.remove();

            return res.redirect('/admin/manager');
        } catch (err) {
            next(err);
        }
    }

    imageResize(image) {
        const imageInfo = path.parse(image.path);

        let addresImages = {};
        addresImages['original'] = this.getUrlImage(`${image.destination}/${image.filename}`);

        const resize = size => {
            let imageName = `${imageInfo.name}-${size}${imageInfo.ext}`;

            addresImages[size] = this.getUrlImage(`${image.destination}/${imageName}`);

            sharp(image.path)
                .resize(size, null)
                .toFile(`${image.destination}/${imageName}`);
        }

        [1080, 720, 480].map(resize);

        return addresImages;
    }

    getUrlImage(dir) {
        return dir.substring(8);
    }

}

module.exports = new accidentController();