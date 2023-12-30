const validator = require('./validator');
const {
    check
} = require('express-validator/check');
const Comment = require('./../../models/comment');
const path = require('path');

class commentValidator extends validator {

    handle() {
        return [
            check('email')
            .isEmail()
            .withMessage('فیلد ایمیل معتبر نیست'),

            check('comment')
            .isLength({
                min: 5
            })
            .withMessage('متن کامنت نمیتواند کمتر از 5 کاراکتر باشد'),
            

            check('name')
            .isLength({
                min: 3
            })
            .withMessage(' نام نمیتواند کمتر از 3 کاراکتر باشد'),

        ]
    }


    slug(title) {
        return title.replace(/([^۰-۹آ-یa-z0-9]|-)+/g, "-")
    }
}

module.exports = new commentValidator();