const controller = require('../controller');
const config = require('../../../../config')
var getJSON = require('get-json')
// var geoip = require('geoip-lite');
const requestIp = require('request-ip');
const publicIp = require('public-ip');

const ReportRegistration = require('../../../models/reportRegistration');

const Map = require('../../../models/map');
const Fire = require('../../../models/fire');
const User = require('../../../models/user');
const Report = require('../../../models/report');
const logReportRegistration = require('../../../models/logreportRegistration');

class reportController extends controller {

   async index(req, res) {
      let page = req.query.page || 1;
      const reportregister = await Report.find()
      .sort({ createdAt: -1 }) // مرتب‌سازی بر اساس جدیدترین گزارشات
      .limit(1) // محدود به 10 گزارش آخر
      .populate('driver')        // اینجا populate می‌شود
      .populate('firefighters')  // اینجا populate می‌شود
      .populate('stationId');    // اگر نیاز دارید ایستگاه هم populate شود
      console.log(reportregister)
    //   var reportregister = await ReportRegistration.find({}).populate('userid').sort({createdAt : -1});
    console.log(reportregister)
      res.render('admin/report',{reportregister})
   }

   async create(req,res,next){
      try{
          const user = await User.find({})
          const station = req.user;
          res.render('admin/report/create',{user , station})
      }catch(err){
          next(err);
      }
  }

  async delete(req,res,next){
   try{
       const user = await User.find({})
       const station = req.user;
       res.render('admin/report/edite',{user , station})
   }catch(err){
       next(err);
   }
}


async edite(req,res,next){
   try{
       const user = await User.find({})
       const temp = await logReportRegistration.find({})
       console.log(temp)
       const logreportregister = await logReportRegistration.find({reportid:req.params.id}).populate('userid ').sort({createdAt:-1})
       const station = req.user;
       res.render('admin/report/edite',{user , station ,logreportregister})
   }catch(err){
       next(err);
   }
}

async update(req,res,next){
   try{
       const user = await User.find({})
       const station = req.user;
       res.render('admin/report/create',{user , station})
   }catch(err){
       next(err);
   }
}

   async info(req, res) {
 
      res.render('admin/report/info')
   }

     
     async search(req, res) {
 
        res.render('admin/report/search')
     }
 
 



}

module.exports = new reportController();