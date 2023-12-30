const controller = require('./../controller');
const Post = require('./../../../models/post');
const Category = require('./../../../models/category');
const Library = require('./../../../models/library');
const config = require('./../../../../config')

const moment = require('moment-jalaali');
moment.loadPersian({
    usePersianDigits: true
})

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

class postController extends controller {
    async index(req, res , next) {
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

            let posts = await Post.paginate({
                approved: true
            }, options).then(function (result) {
                return result
            });

            let categories = await Category.find({});

            res.render('admin/post/index', {
                title: 'همه نوشته ها',
                posts,
                categories
            });

        } catch (err) {
            next(err);
        }
    }



    async filter(req, res , next) {

        try{
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
            let posts = await Post.paginate({
                categories: cate
            }, options).then(function (result) {
                return result
            });
    
    
            let categories = await Category.find({});
    
            res.render('admin/post/filter', {
                title: 'نوشته های فیلتر شده',
                posts,
                categories
            })
        }catch(err){
            next(err)
        }
    }


    async search(req, res , next) {
        try{
            let page = req.query.page || 1;

            var options = {
                sort: {
                    createdAt: -1
                },
                populate: 'categories user',
                lean: true,
                page: page,
                limit: config.pagination
    
            };
            let search = req.query.search;
    
            let posts = await Post.paginate({
                title: {
                    '$regex': search
                }
            }, options).then(function (result) {
                return result
            });
            let pagination = posts;
    
            let categories = await Category.find({});
    
            res.render('admin/post/search', {
                title: 'جستجو برای ' + search,
                posts,
                categories,
                pagination,
                search
            })
        }catch(err){
            next(err)
        }
    }






    async show(req, res , next) {
        try{
            let page = req.query.page || 1;

            var options = {
                sort: {
                    createdAt: -1
                },
                populate: 'categories user',
                lean: true,
                page: page,
                limit: config.pagination
    
            };
    
            let posts = await Post.paginate({
                condition: 1
            }, options).then(function (result) {
                return result
            });
    
    
            let categories = await Category.find({});
    
            res.render('admin/post/show', {
                title: 'نوشته های منتشر شده',
                posts,
                categories
            })
        }catch(err){
            next(err)
        }
    }
    async scheduled(req, res , next) {
        try{
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
    
            let posts = await Post.paginate({
                condition: 2
            }, options).then(function (result) {
                return result
            });
            let categories = await Category.find({});
    
    
            res.render('admin/post/scheduled', {
                title: 'نوشته های زمانبندی شده',
                posts,
                categories
            })
        }catch(err){
            next(err)
        }
    }
    async draft(req, res , next) {
        try{
            let page = req.query.page || 1;

            var options = {
                // select:   'title date author',
                sort: {
                    createdAt: -1
                },
                populate: 'categories user',
                lean: true,
                // offset:   1, 
                page: page,
                limit: config.pagination
    
            };
    
            let posts = await Post.paginate({
                condition: 0
            }, options).then(function (result) {
                return result
            });
            let categories = await Category.find({});
    
            res.render('admin/post/draft', {
                title: 'نوشته های پیش نویس شده',
                posts,
                categories
            })
        }catch(err){
            next(err)
        }
    }




 

    async edite(req, res , next) {
        try{
            let post = await Post.findById(req.params.id);
            let categories = await Category.find({});
            var datenow = new Date().toLocaleDateString('fa-Ir');
            var mom = new Date();
            var miladi = moment(mom).format('YYYY/M/D');
    
            res.render('admin/post/edite', {
                title: 'ویرایش نوشته',
                miladi,
                datenow,
                post,
                categories
            })
        }catch(err){
            next(err)
        }
    }

    async update(req, res, next) {
        try {
            let status = await this.validationData(req);
            if (!status) return this.back(req, res);
            let thumbs =this.imageResize(req.body.images);
            let {
                canonical,
                slug,
                condition,
                title,
                body,
                timestamp,
                images,
                categories,
                tags,
                metaDescription,
                titleSeo,
                keySeo
                } = req.body;
            await Post.findByIdAndUpdate(req.params.id, {
                $set: {
                    title,
                    slug,
                    body,
                    categories,
                    metaDescription,
                    titleSeo,
                    keySeo,
                    timestamp,
                    canonical,
                    images,
                    thumb: thumbs[480],
                    tags,
                    canonical,
                    slug,
                    condition,
                }
            })

            return res.redirect('/admin/post');
        } catch (err) {
            next(err);
        }
    }





    async details(req, res , next) {
        try{
            let post = await Post.findById(req.params.id);

            res.render('admin/post/details', {
                post
            })
        }catch(err){
            next(err)
        }
    }


    async delete(req, res , next) {
        try{
            let post = await Post.findByIdAndUpdate(req.params.id);
            post.approved = false;
            post.condition = 4;
            await post.save();
            res.redirect('/admin/post')
        }catch(err){
            next(err)
        }
    }

    async untrash(req, res , next) {
        try{
            let post = await Post.findByIdAndUpdate(req.params.id);
            post.approved = true;
            post.condition = 1;
    
            await post.save();
            res.redirect('/admin/post', )
        }catch(err){
            next(err)
        }
    }

    async trash(req, res , next) {
        try{
            let page = req.query.page || 1;

            var options = {
                sort: {
                    createdAt: -1
                },
                populate: 'categories user',
                lean: true,
                page: page,
                limit: config.pagination
            };
    
            let posts = await Post.paginate({
                approved: false
            }, options).then(function (result) {
                return result
            });
            let categories = await Category.find({});
    
            res.render('admin/post/trash', {
                title: ' همه نوشته های حذف شده',
                posts,
                categories
            });
        }catch(err){
            next(err)
        }
    }





    async create(req, res , next) {
        try{
            let categories = await Category.find({});
            var datenow = new Date().toLocaleDateString('fa-Ir');
            var mom = new Date();
            var miladi = moment(mom).format('YYYY/M/D');
    
            res.render('admin/post/create', {
                title: 'افزودن نوشته',
                miladi,
                datenow,
                categories
            });
        }catch(err){
            next(err)
        }
    }



    async destroy(req, res, next) {
        try {
            this.isMongoId(req.params.id);

            let product = await Post.findById(req.params.id);
            if (!product) this.error('چنین محصولی وجود ندارد', 404);

            product.remove();

            return res.redirect('/admin/post/trash');
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
            let thumbs =this.imageResize(req.body.images);

            let {
                title,
                canonical,
                slug,
                condition,
                body,
                timestamp,
                images,
                categories,
                metaDescription,
                titleSeo,
                keySeo
            } = req.body;
            let newPost = new Post({
                user : req.user._id,
                title,
                slug: this.slug(slug),
                canonical: canonical == '' ? canonical : this.slug(slug),
                body,
                categories,
                metaDescription,
                titleSeo,
                keySeo,
                timestamp,
                images,
                thumb: thumbs[480],
                canonical,
                slug,
                condition,
            });

            await newPost.save();

            return res.redirect('/admin/post');
        } catch (err) {
            next(err);
        }
    }

    imageResize(image , next) {
        try{
            const imageInfo = path.parse(image);
            let addresImages = {};
            addresImages['original'] = this.getUrlImage(`${imageInfo.dir}/${imageInfo.name}`);
            const addr = 'public' + imageInfo.dir + '/' + imageInfo.base
            const add = 'public' + imageInfo.dir;
            const resize = size => {
                let imageName = `${imageInfo.name}-${size}${imageInfo.ext}`;
    
                addresImages[size] = this.getUrlImage(`${imageInfo.dir}/${imageName}`);
                sharp(addr)
                    .resize(size, null)
                    .toFile(`${add}/${imageName}`, (err, info) => {
                    });
            }
    
            [1080, 720, 480].map(resize);
    
            return addresImages;
        }catch(err){
            next(err)
        }
    }
    getUrlImage(dir , next) {
        try{
        return dir.substring(0);
        }catch(err){
            next(err)
        }
    }
}

module.exports = new postController();