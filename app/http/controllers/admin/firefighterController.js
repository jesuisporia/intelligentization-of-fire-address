const controller = require('../controller');
const Firefighter = require('../../../models/firefighter')
const ReportRegistration = require('../../../models/reportRegistration')
const path = require('path');
const sharp = require('sharp');



class firefighterController extends controller {
    async info(req, res, next) {
        try {
            const firefighter = await Firefighter.findById(req.params.id).populate('reports');
           
            if (!firefighter) return res.status(404).json({ message: 'آتش‌نشان یافت نشد!' });
            res.render('admin/fireman/information', {
                title: 'ارسال پیام',
                firefighter
            });
        } catch (error) {
            res.status(500).json({ message: 'خطای سرور', error });
        }
    }


}

module.exports = new firefighterController();