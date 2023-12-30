const controller = require('../controller');
const config = require('../../../../config')
const User = require('../../../models/user');
const Activity = require('../../../models/activity');

class activityController extends controller {


    async index(req, res, next) {

        try {
            let a = 10;
            let b =2;
            console.log(a+b)
            let page = req.query.page || 1;
            var activity = await Activity.find({}).populate('user').sort({createdAt:-1});
            var result = await Activity.find({});

            var count = result.length;
            res.render('admin/activity/index', {
                activity,
                count
            })
        } catch (err) {
            next(err)
        }
    }

}

module.exports = new activityController();