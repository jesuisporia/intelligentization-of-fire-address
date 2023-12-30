const validator = require('./validator');
const { check } = require('express-validator/check');

class registerValidator extends validator {
    
    handle() {
        return [
            check('name')
                .isLength({ min : 3 })
                .withMessage('فیلد نام نمیتواند کمتر از 3 کاراکتر باشد'),

            check('email')
                .isEmail()
                .withMessage('فیلد ایمیل معتبر نیست'),

            check('password')
                .isLength({ min : 6 })
                .withMessage('فیلد پسورد نمیتواند کمتر از 6 کاراکتر باشد'),
        ]
    }
}

module.exports = new registerValidator();