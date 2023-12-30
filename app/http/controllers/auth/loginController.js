const controller = require('./../controller');
const passport = require('passport');
const Logincheck = require('./../../../models/logincheck');
const publicIp = require('public-ip');
const fs = require('fs');
const path = require('path');

var MobileDetect = require('mobile-detect');
var macaddress = require('macaddress');


// const NodeWebcam = require('node-webcam');



class loginController extends controller {
    a(req,res){
        console.log("ata")
    }
    showLoginForm(req , res) {
        const title = 'صفحه ورود';
        // var io = req.app.locals.io;
        console.log("qqqqq")
        // macaddress.one(function (err, mac) {
        //     console.log("Mac address for this host: %s", mac);  
        //   });
        
        // io.on("connection", function(socket) {
        //     console.log("A user is connected");
        //     socket.on("radio", function(data){
        //       console.log(data);
        //       socket.emit("voice", data);
        //     });
        //     socket.on("disconnect", function() {
        //       console.log("A user is disconnected");
        //     });
        //   });




        // console.log(req.flash('errors'))
        res.render('home/auth/login' , { title });
    }

    async loginProccess(req  ,res , next) {

        try{
            let status = await this.validationData(req);
            if (status) {
                return this.login(req, res , next)
            }
                
            return this.back(req, res);
        }catch(err){
            next(err)
        }
        
    }
 
    async login(req ,res , next) {

        passport.authenticate('local.login' , async (err , user) => {
            if(!user) return res.redirect('/auth/login');
            console.log('aaaaaaaaaaaaaaaaaaaaaa')
            req.logIn(user , async function(err){
                if(req.body.remember) {
                    user.setRememberToken(res);
                }
                // let ip = await publicIp.v4()
                let newLogincheck = new Logincheck ({
                    userid:user.id,
                    // ip:ip,
                    name:user.name,
                    phone:user.phone
                });
                await newLogincheck.save();
                if(req.user.admin){
                    return res.redirect('/admin/home');
                }else{
                return res.redirect('/dashboard');

                }
                
            })


        })(req, res , next);
    }

}

module.exports = new loginController();