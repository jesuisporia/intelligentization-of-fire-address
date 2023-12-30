const controller = require('./../controller');
const Productcategory = require('./../../../models/productcategory');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const config = require('./../../../../config')
var slugify = require('slugify')

class productcategoryController extends controller {



    async filter(req,res){

        let page = req.query.page || 1;
        
        var options = {
            sort:     { createdAt: -1 },
            populate: 'parent',
            lean:     true,
            page:page,
            limit:  config.pagination
            
        };
        let cate = req.body.category; 

        let posts = await Productcategory.paginate({$or:[{_id:cate},{parent:cate}]}, {
            page,
            sort: {
                createdAt: -1
            },
            limit:  config.pagination,
            populate: 'parent'
        }).then(function(result) {
            return result
        });  


        let categories = await Productcategory.find({});
        let category = await Productcategory.find({});

        res.render('admin/productcategory/filter' , {title:'فیلتر دسته محصولات' , posts , category, categories})
    }


    async search(req,res){
        let page = req.query.page || 1;

        var options = {
            sort:     { createdAt: -1 },
            populate: 'parent',
            lean:     true,
            page:page,
            limit: config.pagination
            
        };

        let search = req.query.search; 

        let category = await Productcategory.find({});

        let posts = await Productcategory.paginate({name: {'$regex': search}}, {
            page,
            sort: {
                createdAt: -1
            },
            limit:  config.pagination,
        populate: 'parent'
        }).then(function(result) {
            return result
        });  
        // res.json(posts)
        // return


        res.render('admin/productcategory/search' , {title:' جستجو برای' + search , posts ,category , search})
    }






    async index(req, res) {
        try {
            let page = req.query.page || 1;
            let categories = await Productcategory.paginate({}, {
                page,
                sort: {
                    createdAt: -1
                },
                limit:  config.pagination,
                populate: 'parent'
            });
            let category = await Productcategory.find({
                parent: null
            });

            res.render('admin/productcategory/index', {
                title: 'همه دسته های محصولات',
                categories,
                category
            });
        } catch (err) {
            next(err);
        }
    }


    async create(req, res) {
        try {
            let page = req.query.page || 1;
            let categories = await Productcategory.find({});
            let category = await Productcategory.find({
                parent: null
            });
            res.render('admin/productcategory/create', {
                title: 'افزودن دسته محصولات',
                categories,
                category
            });
        } catch (err) {
            next(err);
        }
    }


    async edite(req, res , next) {
        try {
            this.isMongoId(req.params.id);
            let page = req.query.page || 1;
            let categories = await Productcategory.findById(req.params.id);
            let category = await Productcategory.find({});
            res.render('admin/productcategory/edite', {
                title: 'ویرایش دسته محصولات',
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
            var a = await Productcategory.findByIdAndUpdate(req.params.id, {
                $set: {
                    name,
                    slug: slugify(slug),
                    parent: parent !== 'none' ? parent : null,
                    description,
                    images
                }
            })
            return res.redirect('/admin/productcategory');
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
            let newCategory = new Productcategory({
                name,
                slug: slugify(slug),
                parent: parent !== 'none' ? parent : null,
                description,
                images

            });
            await newCategory.save();
            return res.redirect('/admin/productcategory');
        } catch (err) {
            next(err);
        }
    }


    async destroy(req, res, next) {
        try {
            this.isMongoId(req.params.id);
            let category = await Productcategory.findById(req.params.id);
            if (!category) this.error('چنین دسته ای وجود ندارد', 404);

            category.remove();

            return res.redirect('/admin/productcategory');
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new productcategoryController();