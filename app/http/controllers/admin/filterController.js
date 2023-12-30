const controller = require('./../controller');
const Category = require('./../../../models/category');
const config = require('./../../../../config')

class filterController extends controller {

    async filter(req, res , next) {
        try{
            let page = req.query.page || 1;

            var options = {
                sort: {
                    createdAt: -1
                },
                populate: 'parent',
                lean: true,
                page: page,
                limit: config.pagination
    
            };
            let cate = req.body.category;
    
            let posts = await Category.paginate({
                $or: [{
                    _id: cate
                }, {
                    parent: cate
                }]
            }, {
                page,
                sort: {
                    createdAt: -1
                },
                limit: config.pagination,
                populate: 'parent'
            }).then(function (result) {
                return result
            });
    
    
            let categories = await Productcategory.find({});
            let category = await Productcategory.find({});
    
            res.render('admin/category/filter', {
                title: 'فیلتر دسته نوشته ها',
                posts,
                category,
                categories
            })
        }catch (err){
            next(err);
        }
    }


    async search(req, res, next) {
        try{
            let page = req.query.page || 1;

            var options = {
                sort: {
                    createdAt: -1
                },
                populate: 'parent',
                lean: true,
                page: page,
                limit: config.pagination
    
            };
    
            let search = req.query.search;
    
            let category = await Category.find({});
    
            let posts = await Category.paginate({
                name: {
                    '$regex': search
                }
            }, {
                page,
                sort: {
                    createdAt: -1
                },
                limit: config.pagination,
                populate: 'parent'
            }).then(function (result) {
                return result
            });

            res.render('admin/category/search', {
                title: ' جستجو برای' + search,
                posts,
                category,
                search
            })
        }catch(err){
            next(err);
        }
    }






    async index(req, res , next) {
        try {
            let page = req.query.page || 1;
            let categories = await Category.paginate({}, {
                page,
                sort: {
                    createdAt: -1
                },
                limit: config.pagination,
                populate: 'parent'
            });
            let category = await Category.find({
                parent: null
            });

            res.render('admin/category/index', {
                title: 'همه دسته های نوشته ها',
                categories,
                category
            });
        } catch (err) {
            next(err);
        }
    }


    async create(req, res , next) {
        try {
            let page = req.query.page || 1;
            let categories = await Category.find({});
            let category = await Category.find({
                parent: null
            });
            res.render('admin/category/create', {
                title: 'افزودن دسته نوشته ها',
                categories,
                category
            });
        } catch (err) {
            next(err);
        }
    }


    async edite(req, res, next) {
        try {
            this.isMongoId(req.params.id);
            let page = req.query.page || 1;
            let categories = await Category.findById(req.params.id);
            let category = await Category.find({});
            res.render('admin/category/edite', {
                title: 'ویرایش دسته نوشته ها',
                categories,
                category
            });
        } catch (err) {
            next(err);
        }
    }

    async update(req, res, next) {
        try {
            this.isMongoId(req.params.id);
            let status = await this.validationData(req);
            if (!status) {
                if (req.file)
                    fs.unlinkSync(req.file.path);
                return this.back(req, res);
            }
            let {
                name,
                description,
                parent,
                slug,
                images
            } = req.body;
            var a = await Category.findByIdAndUpdate(req.params.id, {
                $set: {
                    name,
                    slug: this.slug(slug),
                    parent: parent !== 'none' ? parent : null,
                    description,
                    images
                }
            })
            return res.redirect('/admin/category');
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
            let {
                name,
                description,
                parent,
                slug,
                images
            } = req.body;
            let newCategory = new Category({
                name,
                slug: this.slug(slug),
                parent: parent !== 'none' ? parent : null,
                description,
                images

            });
            await newCategory.save();
            return res.redirect('/admin/category');
        } catch (err) {
            next(err);
        }
    }


    async destroy(req, res, next) {
        try {
            this.isMongoId(req.params.id);
            let category = await Category.findById(req.params.id);
            if (!category) this.error('چنین دسته ای وجود ندارد', 404);

            category.remove();

            return res.redirect('/admin/category');
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new filterController();