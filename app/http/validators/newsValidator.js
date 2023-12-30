const validator = require('./validator');
const {
    check
} = require('express-validator/check');
const Newsletter = require('../../models/newsletter');
const path = require('path');

class newsValidator extends validator {

    handle() {
        return [
            check('email')
            .isEmail()
            .withMessage('فیلد ایمیل معتبر نیست')
            .custom(async (value , { req }) => {
                let newsletter = await Newsletter.findOne({email : value});
                console.log(newsletter)
                if(newsletter) {
                    throw new Error('این ایمیل قبلا در سایت ثبت شده است.')
                }
            }),
            check('email')
            .not().isEmpty()
            .withMessage('لطفا آدرس ایمیل خود را وارد نمایید'),


        ]
    }


    slug(title) {
        return title.replace(/([^۰-۹آ-یa-z0-9]|-)+/g, "-")
    }
}

module.exports = new newsValidator();