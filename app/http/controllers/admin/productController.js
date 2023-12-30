const controller = require('./../controller');
const Product = require('./../../../models/product');
const Category = require('./../../../models/category');
const Productcategory = require('./../../../models/productcategory');
const Library = require('./../../../models/library');
const config = require('./../../../../config')
var slugify = require('slugify')

const moment = require('moment-jalaali');
moment.loadPersian({
    usePersianDigits: true
})

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

class productController extends controller {


    async chartview(req, res, next) {
        try {

            return res.json({
                label: 'نمودار محصول',
                data: [650, 59, 80, 81, 56, 55, 40],

            })
        } catch (err) {
            next(err)
        }
    }

    async details(req, res, next) {
        try {
            let post = await Product.findById(req.params.id);
            res.render('admin/product/details', {
                post
            })
        } catch (err) {
            next(err)
        }
    }


    async index(req, res, next) {
        try {
            let page = req.query.page || 1;
            var query = {};
            var options = {
                sort: {
                    createdAt: -1
                },
                populate: 'categories user',
                page: page,
                limit: config.pagination
            };

            let posts = await Product.paginate({
                approved: true
            }, options).then(function (result) {
                return result
            });
            let categories = await Productcategory.find({});

            res.render('admin/product/index', {
                title: 'همه محصولات',
                posts,
                categories
            });

        } catch (err) {
            next(err);
        }
    }



    async filter(req, res, next) {
        try {
            let page = req.query.page || 1;

            var options = {
                sort: {
                    createdAt: -1
                },
                populate: 'categories',
                lean: true,
                page: page,
                limit: config.pagination

            };
            let cate = req.body.category;
            let posts = await Product.paginate({
                categories: cate
            }, options).then(function (result) {
                return result
            });


            let categories = await Productcategory.find({});

            res.render('admin/product/filter', {
                title: 'محصولات فیلتر شده',
                posts,
                categories
            })
        } catch (err) {
            next(err)
        }

    }


    async search(req, res, next) {
        try {
            let page = req.query.page || 1;

            var options = {
                sort: {
                    createdAt: -1
                },
                populate: 'categories',
                lean: true,
                page: page,
                limit: config.pagination

            };
            let search = req.query.search;

            let posts = await Product.paginate({
                title: {
                    '$regex': search
                }
            }, options).then(function (result) {
                return result
            });
            let pagination = posts;

            let categories = await Productcategory.find({});

            res.render('admin/product/search', {
                title: 'جستجو برای ' + search,
                posts,
                categories,
                pagination,
                search
            })
        } catch (err) {
            next(err)
        }
    }






    async show(req, res, next) {
        try {
            let page = req.query.page || 1;

            var options = {
                sort: {
                    createdAt: -1
                },
                populate: 'categories',
                lean: true,
                page: page,
                limit: config.pagination

            };

            let posts = await Product.paginate({
                condition: 1
            }, options).then(function (result) {
                return result
            });


            let categories = await Productcategory.find({});

            res.render('admin/product/show', {
                title: 'محصولات منتشر شده',
                posts,
                categories
            })
        } catch (err) {
            next(err)
        }
    }
    async scheduled(req, res, next) {
        try {
            let page = req.query.page || 1;

            var options = {
                sort: {
                    createdAt: -1
                },
                populate: 'categories',
                lean: true,
                // offset:   1, 
                page: page,
                limit: config.pagination

            };

            let posts = await Product.paginate({
                condition: 2
            }, options).then(function (result) {
                return result
            });
            let categories = await Productcategory.find({});


            res.render('admin/product/scheduled', {
                title: 'محصولات زمانبندی شده',
                posts,
                categories
            })
        } catch (err) {
            next(err)
        }
    }
    async draft(req, res, next) {
        try {
            let page = req.query.page || 1;

            var options = {
                // select:   'title date author',
                sort: {
                    createdAt: -1
                },
                populate: 'categories',
                lean: true,
                // offset:   1, 
                page: page,
                limit: config.pagination

            };

            let posts = await Product.paginate({
                condition: 0
            }, options).then(function (result) {
                return result
            });
            let categories = await Productcategory.find({});

            res.render('admin/product/draft', {
                title: 'محصولات حذف شده',
                posts,
                categories
            })
        } catch (err) {
            next(err)
        }
    }


    async fastedite(req, res, next) {
        try {
            let post = await Product.findById(req.params.id);
            let categories = await Productcategory.find({});
            var datenow = new Date().toLocaleDateString('fa-Ir');
            var mom = new Date();
            var miladi = moment(mom).format('YYYY/M/D');

            res.render('admin/product/fastedite', {
                title: 'ویرایش سریع محصول',
                miladi,
                datenow,
                post,
                categories
            })
        } catch (err) {
            next(err)
        }
    }


    async fastupdate(req, res, next) {
        try {
            let status = await this.validationData(req);
            if (!status) return this.back(req, res);

            let {
                canonical,
                condition,
                title,
                timestamp,
                images,
                categories,
                metaDescription,
                TechnicalSpecifications,
                titleSeo,
                keySeo,
                type,
                slug,
                off,
                cash,
                price
            } = req.body;
            await Product.findByIdAndUpdate(req.params.id, {
                $set: {
                    title,
                    TechnicalSpecifications,
                    categories,
                    metaDescription,
                    titleSeo,
                    keySeo,
                    slug: slugify(slug),
                    timestamp,
                    type,
                    images,
                    canonical,
                    condition,
                    off,
                    cash,
                    price
                }
            })

            return res.redirect('/admin/product');
        } catch (err) {
            next(err);
        }
    }





    async edite(req, res, next) {
        try {
            let post = await Product.findById(req.params.id);
            let categories = await Productcategory.find({});
            var datenow = new Date().toLocaleDateString('fa-Ir');
            var mom = new Date();
            var miladi = moment(mom).format('YYYY/M/D');

            res.render('admin/product/edite', {
                title: 'ویرایش محصول',
                miladi,
                datenow,
                post,
                categories
            })
        } catch (err) {
            next(err)
        }
    }


    async update(req, res, next) {
        try {
            let status = await this.validationData(req);
            if (!status) return this.back(req, res);

            let {
                canonical,
                slug,
                condition,
                gallery,
                title,
                body,
                price,
                timestamp,
                TechnicalSpecifications,
                images,
                off,
                cash,
                categories,
                metaDescription,
                titleSeo,
                keySeo,
                type
            } = req.body;
            let thumbs = this.imageResize(req.body.images);
            await Product.findByIdAndUpdate(req.params.id, {
                $set: {
                    user: req.user._id,
                    title,
                    price,
                    off,
                    cash,
                    slug: slugify(slug),
                    body,
                    categories,
                    metaDescription,
                    titleSeo,
                    keySeo,
                    TechnicalSpecifications,
                    timestamp,
                    type,
                    images,
                    thumb: thumbs[480],
                    canonical,
                    condition,
                    gallery
                }
            })

            return res.redirect('/admin/product');
        } catch (err) {
            next(err);
        }
    }







    async delete(req, res, next) {
        try {

            let post = await Product.findByIdAndUpdate(req.params.id);
            post.approved = false;
            post.condition = 4;
            await post.save();
            res.redirect('/admin/product')
        } catch (err) {
            next(err)
        }
    }

    async untrash(req, res, next) {
        try {

            let post = await Product.findByIdAndUpdate(req.params.id);
            post.approved = true;
            post.condition = 1;

            await post.save();
            res.redirect('/admin/product', )
        } catch (err) {
            next(err)
        }
    }

    async trash(req, res, next) {
        try {
            let page = req.query.page || 1;

            var options = {
                sort: {
                    createdAt: -1
                },
                populate: 'categories',
                lean: true,
                page: page,
                limit: config.pagination
            };

            let posts = await Product.paginate({
                approved: false
            }, options).then(function (result) {
                return result
            });
            let categories = await Productcategory.find({});

            res.render('admin/product/trash', {
                title: ' همه محصولات حذف شده',
                posts,
                categories
            });
        } catch (err) {
            next(err)
        }
    }





    async create(req, res, next) {
        try {
            let categories = await Productcategory.find({});
            res.render('admin/product/create', {
                title: 'درج محصول',
                categories
            });
        } catch (err) {
            next(err)
        }
    }



    async destroy(req, res, next) {
        try {
            this.isMongoId(req.params.id);

            let product = await Product.findById(req.params.id).populate('viewpoint').exec();
            if (!product) this.error('چنین محصولی وجود ندارد', 404);

            product.viewpoint.forEach(viewpoint => viewpoint.remove());

            product.remove();

            return res.redirect('/admin/product/trash');
        } catch (err) {
            next(err);
        }
    }

    async store(req, res, next) {
        try {
            let status = await this.validationData(req);
            if (!status) {
                if (req.file)
                    fs.unlinkSync(req.file.path);
                return this.back(req, res);
            }
            let thumbs = this.imageResize(req.body.images);

            let {
                canonical,
                slug,
                condition,
                gallery,
                off,
                cash,
                title,
                body,
                price,
                timestamp,
                TechnicalSpecifications,
                images,
                categories,
                metaDescription,
                titleSeo,
                keySeo,
                type
            } = req.body;
            let newProduct = new Product({
                user: req.user._id,
                title,
                off,
                cash,
                price,
                slug: slugify(slug),
                body,
                categories,
                metaDescription,
                titleSeo,
                keySeo,
                TechnicalSpecifications,
                timestamp,
                type,
                images,
                thumb: thumbs[480],
                canonical: canonical !== "" ? canonical : slugify(slug),
                condition,
                gallery
            });
            await newProduct.save(err => {
                if (err) return done(err, false, req.flash('errors', 'خطایی رخ داده لطفا دوباره محصول خود را ثبت نمایید.'));
            })
            // await newProduct.save();

            return res.redirect('/admin/product');
        } catch (err) {
            next(err);
        }
    }

    imageResize(image) {
        const imageInfo = path.parse(image);
        let addresImages = {};
        addresImages['original'] = this.getUrlImage(`${imageInfo.dir}/${imageInfo.name}`);
        const addr = 'public' + imageInfo.dir + '/' + imageInfo.base
        const add = 'public' + imageInfo.dir;
        const resize = size => {
            let imageName = `${imageInfo.name}-${size}${imageInfo.ext}`;

            addresImages[size] = this.getUrlImage(`${imageInfo.dir}/${imageName}`);
            console.log(addr)
            sharp(addr)
                .resize(size, null)
                .toFile(`${add}/${imageName}`, (err, info) => {
                    console.log('err: ', imageInfo.dir);
                    console.log('info: ', info);
                });
        }

        [1080, 720, 480].map(resize);

        return addresImages;
    }
    getUrlImage(dir) {
        return dir.substring(0);
    }
}

module.exports = new productController();