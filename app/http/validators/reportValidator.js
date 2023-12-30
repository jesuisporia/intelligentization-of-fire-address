const validator = require('./validator');
const Category = require('../../models/reportRegistration')
const path = require('path');
const {
    check
} = require('express-validator/check');

class reportValidator extends validator {

    handle() {
        return [
        
            check('incidenttime')
            .not().isEmpty()
            .withMessage('تاریخ بروز حادثه نمیتواند خالی بماند') ,

            check('timetoannouncetheaccident')
            .not().isEmpty()
            .withMessage('زمان بروز حادثه نمیتواند خالی بماند'),

            check('numberofdispatchofficers')
            .not().isEmpty()
            .withMessage('تعداد مامورین اعزامی نمیتواند خالی بماند'),

            check('timetostarttheoperation')
            .not().isEmpty()
            .withMessage('زمان شروع عملیات نمیتواند خالی بماند'),
            
            check('timetoendtheoperation')
            .not().isEmpty()
            .withMessage('زمان خاتمه عملیات نمیتواند خالی بماند'),

            check('durationofoperation')
            .not().isEmpty()
            .withMessage('مدت عملیات نمیتواند خالی بماند'),

            check('accidentaddress')
            .not().isEmpty()
            .withMessage('محل وقوع حادثه نمیتواند خالی بماند'),

            check('receivernews')
            .not().isEmpty()
            .withMessage('خبر گیرنده نمیتواند خالی بماند'),

            check('informant')
            .not().isEmpty()
            .withMessage('خبر دهنده نمیتواند خالی بماند'),

            check('Newsmethod')
            .not().isEmpty()
            .withMessage('روش خبر رسانی نمیتواند خالی بماند'),

            check('fireman')
            .not().isEmpty()
            .withMessage('پرسنل شرکت کننده نمیتواند خالی بماند'),


            check('Thelocationoftheaccident')
            .not().isEmpty()
            .withMessage('مشخصات محل بروز حادثه نمیتواند خالی بماند'),

            check('inputRelatedService')
            .not().isEmpty()
            .withMessage('شیفت نمیتواند خالی بماند'),

            check('Typeofaccident')
            .not().isEmpty()
            .withMessage('نوع حادثه نمیتواند خالی بماند'),


            

            // check('shomarename')
            // .not().isEmpty()
            // .withMessage('فیلد شماره نامه الزامی است')
            // .custom(async (value , { req }) => {
            //     if(req.query._method === 'put') {
            //         let incentivegroup = await Category.findById(req.params.id);
            //         if(incentivegroup.shomarename === value) return;
            //     }
                
            //     let incentivegroup = await Category.findOne({ shomarename : value });
            //     if(incentivegroup) {
            //         throw new Error('این شماره نامه در سامانه قرار دارد')
            //     }
            // }),




        ]
    }

}

module.exports = new reportValidator();