const User = require('./../../models/user');
const middleware = require('./middleware');

class redirectIfAuthenticated extends middleware {
    
    handle(req , res ,next) {
        if(req.isAuthenticated())
            return next();
        // if(req.user.admin){
        //     return res.redirect('/admin/home')

        // }
        return res.redirect('/auth/login')
    }


}


module.exports = new redirectIfAuthenticated();