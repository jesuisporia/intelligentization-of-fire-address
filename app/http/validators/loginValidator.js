const validator = require('./validator');
const { check } = require('express-validator/check');

class loginValidator extends validator {
    
    handle() {
        return [
            check('email')
                .isEmail()
                .withMessage('فیلد ایمیل معتبر نیست'),

            check('password')
                .isLength({ min : 6 })
                .withMessage('فیلد پسورد نمیتواند کمتر از 6 کاراکتر باشد')
        ]
    }
}

module.exports = new loginValidator();