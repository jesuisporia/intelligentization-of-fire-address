const controller = require('./../controller');
const passport = require('passport');
const Station = require('./../../../models/station')
const User = require('./../../../models/user')
class registerController extends controller {

    async showRegsitrationForm(req , res) {
        const title = 'صفحه عضویت';
        var station = await Station.find({}); 
        var user = await User.find({admin:true , state:true}); 
        res.render('home/auth/register' , { title  , station , user});
    }

    async registerProccess(req ,res , next) {
        let result = await this.validationData(req)
        if(result) {
            return this.register(req , res , next)
        } 
        return this.back(req, res);
            
        // return res.redirect('/auth/register');  
    }
    
    register(req , res , next) {
        console.log('resive')
        passport.authenticate('local.register' , { 
            successRedirect : '/dashboard',
            failureRedirect : '/auth/register',
            failureFlash : true
        })(req, res , next);
    }

}

module.exports = new registerController();