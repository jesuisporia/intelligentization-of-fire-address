const autoBind = require('auto-bind');
// const Recaptcha = require('express-recaptcha').Recaptcha;
const { validationResult } = require('express-validator/check');
const config = require('./../../../config')
const isMongoId = require('validator/lib/isMongoId');
const sprintf = require('sprintf-js').sprintf;

module.exports = class controller {
    constructor() {
        autoBind(this);
    }

    async validationData(req) {
        const result = validationResult(req);
        if (! result.isEmpty()) {
            const errors = result.array();
            const messages = [];
           
            errors.forEach(err => messages.push(err.msg));
            req.flash('errors' , messages)
            return false;
        }

        return true;
    }


    async ajaxvalidationData(req ) {
        const result = validationResult(req);
        if (! result.isEmpty()) {
            const errors = result.array();
            const messages = [];
           
            errors.forEach(err => messages.push(err.msg));

            console.log(messages)
            // req.flash('errors' , messages);

            return messages;
        }

        return true;
    }
    back(req , res) {
        req.flash('formData' , req.body);
        return res.redirect(req.header('Referer') || '/');
    }
    ajax(req,res){
        var a = req.flash('formData' , req.body);
        console.log(a)
        res.json(req.flash('errors' , messages))
    }

    isMongoId(paramId) {
        if(! isMongoId(paramId))
            this.error('ای دی وارد شده صحیح نیست', 404);
    }

    async isMongoIdajax(paramId ) {
        if(! isMongoId(paramId)){
            return false
        }else{
            return true
        }
    }








    error(message , status = 500) {
        let err = new Error(message);
        err.status = status;
        throw err;
    }

    slug(slug) {
        return slug.replace(/([^۰-۹آ-یa-z0-9]|-)+/g , "-")
    }

}