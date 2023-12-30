const validator = require('./validator');
const { check } = require('express-validator/check');
const Productcategory = require('./../../models/productcategory');

class categoryValidator extends validator {
     
    handle() {
        return [
            check('name')
                .isLength({ min : 3 })
                .withMessage('عنوان نمیتواند کمتر از 3 کاراکتر باشد')
                .custom(async (value , { req }) => {
                    if(req.query._method === 'put') {
                        let productcategory = await Productcategory.findById(req.params.id);
                        console.log(productcategory)
                        if(productcategory.slug === value) return;
                    }
                    
                    let productcategory = await Productcategory.findOne({ slug : this.slug(value) });
                    if(productcategory) {
                        throw new Error('چنین دسته ای با این عنوان قبلا در سایت قرار داد شده است')
                    }
                }),

                check('slug')
                .not().isEmpty()
                .withMessage('فیلد آدرس دسته نمیتواند خالی بماند'),

                check('description')
                .not().isEmpty()
                .withMessage('فیلد توضیحات دسته نمیتواند خالی بماند'),

                check('images')
                .not().isEmpty()
                .withMessage('فیلد تصویر دسته نمیتواند خالی بماند'),

                
                
                check('parent')
                .not().isEmpty()
                .withMessage('فیلد مادر دسته نمیتواند خالی بماند')
        ]
    }

    slug(title) {
        return title.replace(/([^۰-۹آ-یa-z0-9]|-)+/g , "-")
    }
}

module.exports = new categoryValidator();