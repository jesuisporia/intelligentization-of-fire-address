const validator = require('./validator');
const { check } = require('express-validator/check');
const Post = require('./../../models/post');
const path = require('path');

class courseValidator extends validator {
    
    handle() {
        return [
            check('title')
                .isLength({ min : 5 })
                .withMessage('عنوان نمیتواند کمتر از 5 کاراکتر باشد')
                .custom(async (value , { req }) => {
                    if(req.query._method === 'put') {
                        let course = await Post.findById(req.params.id);
                        if(course.title === value) return;
                    }
                    let course = await Post.findOne({ slug : this.slug(value) });
                    if(course) {
                        throw new Error('چنین نوشته ای با این عنوان قبلا در سایت قرار داد شده است')
                    }
                }),

            check('images')
                .custom(async (value , { req }) => {
                    if(req.query._method === 'put' && value === undefined) return;

                    if(! value)
                        throw new Error('وارد کردن تصویر الزامی است');

                    let fileExt = ['.png' , '.jpg' , '.jpeg' , '.svg'];
                    if(! fileExt.includes(path.extname(value)))
                        throw new Error('پسوند فایل وارد شده از پسوندهای تصاویر نیست')
                }),
            

                check('metaDescription')
                .isLength({ min : 3 })
                .withMessage('توضیحات سئو نوشته نمیتواند خالی بماند'),

                check('titleSeo')
                .isLength({ min : 3 })
                .withMessage('عنوان سئو نوشته نمیتواند خالی بماند'),

                check('keySeo')
                .isLength({ min : 3 })
                .withMessage('کیورد سئو نوشته نمیتواند خالی بماند'),


                check('categories')
                .isLength({ min : 3 })
                .withMessage('دسته نوشته نمیتواند خالی بماند'),

                check('slug')
                .isLength({ min : 3 })
                .withMessage('آدرس نوشته نمیتواند کمتر از 20 کاراکتر باشد'),

                check('body')
                .isLength({ min : 20 })
                .withMessage('متن نوشته نمیتواند کمتر از 20 کاراکتر باشد'),

        ]
    }

    
    slug(title) {
        return title.replace(/([^۰-۹آ-یa-z0-9]|-)+/g , "-")
    }
}

module.exports = new courseValidator();