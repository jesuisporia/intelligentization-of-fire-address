const validator = require('./validator');
const Educational = require('../../models/category')
const {
    check
} = require('express-validator/check');

class educationalValidator extends validator {

    handle() {
        return [



            check('description')
            .not().isEmpty()
            .withMessage('فیلد توضیحات نمیتواند خالی بماند')

            ,

            check('title')
            .not().isEmpty()
            .withMessage('فیلد عنوان الزامی است')
            .not().isNumeric()
            .withMessage('فیلد عنوان نمیتواند عدد باشد')
            .custom(async (value , { req }) => {
                if(req.query._method === 'put') {
                    let incentivegroup = await Educational.findById(req.params.id);
                    if(incentivegroup.title === value) return;
                }
                
                let incentivegroup = await Educational.findOne({ title : value });
                if(incentivegroup) {
                    throw new Error('این عنوان در سامانه قرار دارد')
                }
            }),




        ]
    }

}

module.exports = new educationalValidator();