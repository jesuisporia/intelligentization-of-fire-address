const controller = require('../controller');
const User = require('./../../../models/user')
const ReportRegistration = require('./../../../models/reportRegistration')
const path = require('path');
const sharp = require('sharp');



class firemanController extends controller {
    async index(req, res, next) {
        try {
 
            // let page = req.query.page || 1;
            let user = await User.find({admin : false}).populate('station');

            // console.log(user)
            res.render('admin/fireman/index', {
                title: 'لیست تمام آتش نشانها',
                user
            });
        } catch (err) {
            next(err);
        }
    }


    async information(req, res, next) {
        try {
            let page = req.query.page || 1;

            let fireman = await User.findById(req.params.id);
            let reportinformation = await ReportRegistration.paginate({
                "fireman": {
                    $in: [req.params.id]
                }
            }, {
                page,
                sort: {
                    createdAt: -1
                },
                limit: 10
            })

            let lastreportinformation = await ReportRegistration.find({
                "fireman": {
                    $in: [req.params.id]
                }
            }).sort({
                createdAt: -1
            }).limit(-1)
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
            let star = await User.find({
            }).sort({
                createdAt: -1
            });
            let user = await User.find({
                admin: true
            });
            console.log(user)
            res.render('admin/fireman/create', {
                title: 'افزودن آتش نشان',
                user
            });
        } catch (err) {
            next(err);
        }
    }


    async graphics(req, res) {
        res.render('admin/user/graphics')
    }

    async edit(req, res) {
        try {
            let user = await User.findById(req.params.id);
            let station = await User.find({
                admin: true
            });
            console.log(user)
            res.render('admin/fireman/edit', {
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
            // let images = this.imageResize(req.file);
            // console.log(images)
            let newUser = new User({
                name: req.body.name,
                address: req.body.address,
                phone: req.body.phone,
                melicode: req.body.melicode,
                personalcode: req.body.personalcode,
                // picture: images,
                shifte: req.body.shifte,
                // thumb: images[480],
                // admin:req.body.name,
                // state:req.body.state,
                station: req.body.station,
                // email: req.body.personalcode + '@gmail.com',
                password: 123654789,
            });

            await newUser.save(err => {
                console.log(err)
            });

            res.redirect('/admin/user');
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

module.exports = new firemanController();