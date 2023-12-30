const User = require('./../../models/user');
const middleware = require('./middleware');

class redirectIfNotAdmin extends middleware {
    
    handle(req , res ,next) {
        if(req.isAuthenticated() && req.user.admin)
            return next();
    
        return res.redirect('/auth/login')    }


}


module.exports = new redirectIfNotAdmin();