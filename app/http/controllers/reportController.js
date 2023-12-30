const controller = require('./../controllers/controller');
const config = require('./../../../config')
var getJSON = require('get-json')
// var geoip = require('geoip-lite');
const requestIp = require('request-ip');
const publicIp = require('public-ip');
var shortUrl = require('node-url-shortener');
const User = require('./../../models/user');
var getJSON = require('get-json');



// var url = require('url');


var Kavenegar = require('kavenegar');
var api = Kavenegar.KavenegarApi({
    apikey: '704859536434724B6B69436366643466767135716B773D3D'
});

const Map = require('./../../models/map');
const Fire = require('./../../models/fire');
const ReportRegistration = require('./../../models/reportRegistration');
const logReportRegistration = require('./../../models/logreportRegistration');

class reportController extends controller {


    async index(req, res, next) {

        try {
            let page = req.query.page || 1;
            var reportregister = await ReportRegistration.paginate({}, {
                page,
                sort: {
                    createdAt: -1
                },
                limit: 10
            });

            // res.json(reportregister)
            res.render('home/dashboard/report', {
                reportregister
            })
        } catch (err) {
            next(err)
        }
    }

    async create(req, res, next) {
        try {

            var address = getJSON('http://api.openweathermap.org/data/2.5/weather?q=Kermanshah&lang=fa&appid=4a5339dbe4dc3504409fb39d9018525e', async function (error, response) {
                console.log(response)
            });
            // console.log(address.wind)

            const user = await User.find({
                station: req.user.id
            })
            const station = req.user;
            res.render('home/dashboard/report/create', {
                user,
                station
            })
        } catch (err) {
            next(err);
        }
    }

    async single(req, res, next) {
        try {
            var reportregister = await ReportRegistration.findById(req.params.id).populate('userid fireman');

            console.log(reportregister);
            res.render('layouts/single', {
                reportregister
            })
            // var reportregister = 

        } catch (err) {
            next(err)
        }
    }
    async store(req, res, next) {
        try {
            let status = await this.validationData(req);
            if (!status) return this.back(req, res);

            let {
                incidenttime,
                inputRelatedService,
                timetoannouncetheaccident,
                numberofdispatchofficers,
                timetostarttheoperation,
                timetoendtheoperation,
                durationofoperation,
                accidentaddress,
                informant,
                receivernews,
                Newsmethod,
                Operatingstation,
                Thelocationoftheaccident,
                Numberoffloors,
                buildingtype,
                Theownername,
                Tenantname,
                Typeofaccident,
                fire,
                Otherevents,
                Explainthecausesoftheaccident,
                Explaintheinitialstepstaken,
                DescriptionofOperation,
                Descriptionofproblems,
                Atmosphericconditions,
                Presenceofcooperationofotherstations,
                Accidentprofile,
                Equipmentused,
                Havethesitebeenvisitedbefore,
                Winddirection,
                Presenceandcooperationofotherstationscentersandorganizations,
                windspeed,
                temperature,
                relativehumidity,
                Firetruck,
                Carcarryingequipment,
                meterladdercarthree,
                meterladdercarfive,
                Hydrauliclift,
                Carrescue,
                Ambulance,
                Pipe,
                Headpipe,
                Exporter,
                Burntclothing,
                Powder,
                Portablemotorpump,
                Respiratorysystem,
                Brushingmachine,
                Electricgenerator,
                Cuffs,
                Water,
                other,
                Visitorname,
                Lastvisitdate,
                whatLastvisitdate,
                fireman
            } = req.body;


            let newReportRegistration = new ReportRegistration({
                fireman,
                inputRelatedService,
                userid: req.user.id,
                incidenttime,
                timetoannouncetheaccident,
                numberofdispatchofficers,
                timetostarttheoperation,
                timetoendtheoperation,
                durationofoperation,
                accidentaddress,
                informant,
                receivernews,
                Newsmethod,
                Operatingstation,
                Thelocationoftheaccident,
                Numberoffloors,
                buildingtype,
                Theownername,
                Tenantname,
                Typeofaccident,
                fire,
                Otherevents,
                Explainthecausesoftheaccident,
                Explaintheinitialstepstaken,
                DescriptionofOperation,
                Descriptionofproblems,
                Atmosphericconditions,
                Presenceofcooperationofotherstations,
                Accidentprofile,
                Equipmentused,
                Havethesitebeenvisitedbefore,
                Winddirection,
                Presenceandcooperationofotherstationscentersandorganizations,
                windspeed,
                temperature,
                relativehumidity,
                Firetruck,
                Carcarryingequipment,
                meterladdercarthree,
                meterladdercarfive,
                Hydrauliclift,
                Carrescue,
                Ambulance,
                Pipe,
                Headpipe,
                Exporter,
                Burntclothing,
                Powder,
                Portablemotorpump,
                Respiratorysystem,
                Brushingmachine,
                Electricgenerator,
                Cuffs,
                Water,
                other,
                Visitorname,
                Lastvisitdate,
                whatLastvisitdate
            });

            await newReportRegistration.save();
            return res.redirect('/dashboard/report');

        } catch (err) {
            next(err);
        }
    }


    async edite(req, res, next) {
        try {
            var reportregister = await ReportRegistration.findById(req.params.id).populate('userid fireman');
            const user = await User.find({})
            const station = req.user;
            res.render('home/dashboard/report/edite', {
                user,
                station,
                reportregister
            })
        } catch (err) {
            next(err);
        }
    }

    async update(req, res, next) {

        try {
            let {
                incidenttime,
                inputRelatedService,
                timetoannouncetheaccident,
                numberofdispatchofficers,
                timetostarttheoperation,
                timetoendtheoperation,
                durationofoperation,
                accidentaddress,
                informant,
                receivernews,
                Newsmethod,
                Operatingstation,
                Thelocationoftheaccident,
                Numberoffloors,
                buildingtype,
                Theownername,
                Tenantname,
                Typeofaccident,
                fire,
                Otherevents,
                Explainthecausesoftheaccident,
                Explaintheinitialstepstaken,
                DescriptionofOperation,
                Descriptionofproblems,
                Atmosphericconditions,
                Presenceofcooperationofotherstations,
                Accidentprofile,
                Equipmentused,
                Havethesitebeenvisitedbefore,
                Winddirection,
                Presenceandcooperationofotherstationscentersandorganizations,
                windspeed,
                temperature,
                relativehumidity,
                Firetruck,
                Carcarryingequipment,
                meterladdercarthree,
                meterladdercarfive,
                Hydrauliclift,
                Carrescue,
                Ambulance,
                Pipe,
                Headpipe,
                Exporter,
                Burntclothing,
                Powder,
                Portablemotorpump,
                Respiratorysystem,
                Brushingmachine,
                Electricgenerator,
                Cuffs,
                Water,
                other,
                Visitorname,
                Lastvisitdate,
                whatLastvisitdate,
                fireman
            } = req.body;
            
            await ReportRegistration.findByIdAndUpdate(req.params.id , { $set : { 
                incidenttime,
                inputRelatedService,
                timetoannouncetheaccident,
                numberofdispatchofficers,
                timetostarttheoperation,
                timetoendtheoperation,
                durationofoperation,
                accidentaddress,
                informant,
                receivernews,
                Newsmethod,
                Operatingstation,
                Thelocationoftheaccident,
                Numberoffloors,
                buildingtype,
                Theownername,
                Tenantname,
                Typeofaccident,
                fire,
                Otherevents,
                Explainthecausesoftheaccident,
                Explaintheinitialstepstaken,
                DescriptionofOperation,
                Descriptionofproblems,
                Atmosphericconditions,
                Presenceofcooperationofotherstations,
                Accidentprofile,
                Equipmentused,
                Havethesitebeenvisitedbefore,
                Winddirection,
                Presenceandcooperationofotherstationscentersandorganizations,
                windspeed,
                temperature,
                relativehumidity,
                Firetruck,
                Carcarryingequipment,
                meterladdercarthree,
                meterladdercarfive,
                Hydrauliclift,
                Carrescue,
                Ambulance,
                Pipe,
                Headpipe,
                Exporter,
                Burntclothing,
                Powder,
                Portablemotorpump,
                Respiratorysystem,
                Brushingmachine,
                Electricgenerator,
                Cuffs,
                Water,
                other,
                Visitorname,
                Lastvisitdate,
                whatLastvisitdate,
                fireman
             }})
             
            let newlogReportRegistration = new logReportRegistration({
                fireman,
                reportid:req.params.id,
                inputRelatedService,
                userid: req.user.id,
                incidenttime,
                timetoannouncetheaccident,
                numberofdispatchofficers,
                timetostarttheoperation,
                timetoendtheoperation,
                durationofoperation,
                accidentaddress,
                informant,
                receivernews,
                Newsmethod,
                Operatingstation,
                Thelocationoftheaccident,
                Numberoffloors,
                buildingtype,
                Theownername,
                Tenantname,
                Typeofaccident,
                fire,
                Otherevents,
                Explainthecausesoftheaccident,
                Explaintheinitialstepstaken,
                DescriptionofOperation,
                Descriptionofproblems,
                Atmosphericconditions,
                Presenceofcooperationofotherstations,
                Accidentprofile,
                Equipmentused,
                Havethesitebeenvisitedbefore,
                Winddirection,
                Presenceandcooperationofotherstationscentersandorganizations,
                windspeed,
                temperature,
                relativehumidity,
                Firetruck,
                Carcarryingequipment,
                meterladdercarthree,
                meterladdercarfive,
                Hydrauliclift,
                Carrescue,
                Ambulance,
                Pipe,
                Headpipe,
                Exporter,
                Burntclothing,
                Powder,
                Portablemotorpump,
                Respiratorysystem,
                Brushingmachine,
                Electricgenerator,
                Cuffs,
                Water,
                other,
                Visitorname,
                Lastvisitdate,
                whatLastvisitdate
            });
            
            await newlogReportRegistration.save();


             
            res.redirect('/dashboard/report')
        } catch (err) {
            next(err);
        }
    }

}

module.exports = new reportController();