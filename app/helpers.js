const path = require('path');
const autoBind = require('auto-bind');
const config = require('./../config')
var gravatar = require('gravatar');
const moment = require('moment-jalaali');
const persify = require('persify');
moment.loadPersian({usePersianDigits: true})
var ReportRegistration = require('./models/reportRegistration');

module.exports = class Helpers {
    
    constructor(req , res) {
        autoBind(this);
        this.req = req;
        this.res = res;
        this.formData = req.flash('formData')[0];
    }


    getObjects() {
        return {
            auth : this.auth(),
            viewPath : this.viewPath,
            ...this.getGlobalVaribales(),
            old : this.old,
            price : this.price,
            thumd : this.thumd,
            temp:this.temp,
            avatart : this.avatart,
            req : this.req,
            datas : this.datas,
            number : this.number,
            counter:this.counter
        }
    }

     async counter(id){


        
        return 1
    }
    avatart(email){
        return gravatar.url(email);
    }
    getGlobalVaribales() {
        return {
            errors : this.req.flash('errors')
        }
    }
    datas(time) {
        return moment(time);
    }
    auth() {
        return {
            check : this.req.isAuthenticated(),
            user : this.req.user
        }
    }
    old(field , defaultValue = '') {
        return this.formData && this.formData.hasOwnProperty(field) ? this.formData[field] : defaultValue;
    }
    viewPath(dir) {
        return path.resolve(config.layout.view_dir + '/' + dir);
    }

    number(num) {
        if(persify(num) != undefined)
            return persify(num);
        return 

    }
    thumd(thumb){
        var result = thumb.find(obj => {
            return obj.original
          })
        console.log(result)
        return result
    }


    price(price){
        return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    }


}