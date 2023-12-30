const controller = require('../controller');
const User = require('../../../models/user');
const Role = require('../../../models/role');

class payamController extends controller {
    async index(req , res) {
        try {


            res.render('admin/payam/index',  { title : 'پیام ها' });
        } catch (err) {
            next(err);
        }
    }
    
    async createpayam(req , res) {
        res.render('admin/users/create');        
    }

    async sendpayam(req , res , next) {
        try {
            let status = await this.validationData(req);
            if(! status) return this.back(req,res);
        
            let { name , email , password } = req.body;

            let newUser = new User({ 
                name,
                email,
                password
             });

            await newUser.save();

            return res.redirect('/admin/users');  
        } catch(err) {
            next(err);
        }
    }

    async editpayam(req, res ,next) {
        try {
            this.isMongoId(req.params.id);

            let category = await Category.findById(req.params.id);
            let categories = await Category.find({ parent : null });
            if( ! category ) this.error('چنین دسته ای وجود ندارد' , 404);


            return res.render('admin/categories/edit' , { category , categories });
        } catch (err) {
            next(err);
        }
    }

    async updatepayam(req, res , next) {
        try {
            let status = await this.validationData(req);
            if(! status) return this.back(req,res);

            let { name , parent } = req.body;
            
            await Category.findByIdAndUpdate(req.params.id , { $set : { 
                name,
                slug : this.slug(name),
                parent : parent !== 'none' ? parent : null
             }})

            return res.redirect('/admin/categories');
        } catch(err) {
            next(err);
        }
    }

    async destroypayam(req , res , next) {
        try {
            this.isMongoId(req.params.id);

            let user = await User.findById(req.params.id).populate({ path : 'courses' , populate : [ 'episodes' ]}).exec();
            if( ! user ) this.error('چنین کاربری وجود ندارد' , 404);

            user.courses.forEach(course => {
                course.episodes.forEach(episode => episode.remove());
                course.remove();
            })

            // delete user
            user.remove();

            return res.redirect('/admin/users');
        } catch (err) {
            next(err);
        }
    }

}

module.exports = new payamController();