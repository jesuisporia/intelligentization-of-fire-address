const controller = require('./../controller');
const passport = require('passport');
const PasswordReset = require('./../../../models/password-reset');
const User = require('./../../../models/user');
const uniqueString = require('unique-string')
const config = require('./../../../../config')

class forgotPasswordController extends controller {
    
    showForgotPassword(req , res) {
        const title = 'فراموشی رمز عبور';
        res.render('home/auth/passwords/email' , { errors : req.flash('errors') , title });
    }

    async sendPasswordResetLink(req  ,res , next) {
        // await this.recaptchaValidation(req , res);
        let result = true
        if(result) {
            return this.sendResetLink(req, res)
        } 
            
        return res.redirect('/auth/password/reset');
    }



}

module.exports = new forgotPasswordController();