const validator = require('./validator');
const {
    check
} = require('express-validator/check');
// const Comment = require('../../models/comment');
// const path = require('path');

class viewpointValidator extends validator {

    handle() {
        return [

            check('comment')
            .isLength({
                min: 5
            })
            .withMessage('متن نظر نمیتواند کمتر از 5 کاراکتر باشد'),
            

        ]
    }



}

module.exports = new viewpointValidator();