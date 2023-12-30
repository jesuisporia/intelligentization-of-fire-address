const controller = require('../controller');
var Kavenegar = require('kavenegar');
// const uniqueString = require('unique-string')
const Map = require('../../../models/map');
const Fire = require('../../../models/fire');
const Suggestion = require('../../../models/suggestion');
const ReportRegistration = require('../../../models/reportRegistration');
const mongo = require('mongodb');
const mongoose = require('mongoose');

var MongoClient = require('mongodb').MongoClient;

var Kavenegar = require('kavenegar');
var api = Kavenegar.KavenegarApi({
    apikey: '704859536434724B6B69436366643466767135716B773D3D'
});



class dashboardController extends controller {

    async index(req, res) {

        // var reportregister = await ReportRegistration.find({}).populate('userid').limit(10).sort({createdAt : -1});

        res.render('admin/index');
    }



    callsonline(req, res) {
        var io = req.app.locals.io;
        


        res.render('admin/callsonline/index');
    }


    reportRegistration(req, res) {
        res.render('admin/index');
    }
    async storereportRegistration(req, res, next) {
        try {
            let status = await this.validationData(req);
            if (!status) return this.back(req, res);

            let {
                name,
                phone,
                payam
            } = req.body;

            let newReportRegistration = new ReportRegistration({
                name,
                phone,
                payam
            });

            await newReportRegistration.save();

            return res.redirect('/admin/suggestion');
        } catch (err) {
            next(err);
        }
    }
    async storesuggestion(req, res, next) {
        try {
            let status = await this.validationData(req);
            if (!status) return this.back(req, res);

            let {
                name,
                phone,
                payam
            } = req.body;

            let newSuggestion = new Suggestion({
                name,
                phone,
                payam
            });

            await newSuggestion.save();

            return res.redirect('/admin/suggestion');
        } catch (err) {
            next(err);
        }
    }

    async one(req, res) {
        let map = await Map.findOne({
            token: req.params.token
        });

        await map.update({
            station: req.params.id
        });
        res.redirect('/admin/reports')
        // res.json(map)
        // res.render('admin/index');
    }

    async seven(req, res) {
        let map = await Map.findOne({
            token: req.params.token
        });

        await map.update({
            station: req.params.id
        });

        res.json(map)
        // res.render('admin/index');
    }

    fire(req, res) {
        res.render('admin/fire');
    }
    async reports(req, res) {
        let map = await Map.find({}).sort({
            createdAt: -1
        }).limit(20);

        var io = req.app.locals.io;

        // Map.watch().on('change', data => console.log(new Date(), data));

        io.of('/reports').on('connection', function (socket) {
            console.log('someone connected');
        });


        io.on('connection', async (socket) => {


            setInterval(async function () {
                var map = await Map.findOne({
                    notification: false,
                    visit: true
                });
                if (map === null) {
                    console.log('nuuuuuuuuuuuuul')
                } else if (map) {
                    console.log('trrrrrrrrrrrrrrru')
                    socket.emit('temp', {
                        temp: map
                    });
                    await map.update({
                        notification: true
                    });

                }

            }, 3000)

        });




        // Map.watch().on('change',  data =>{
        //     console.log('dddddddddddddddddd')
        // })


        res.render('admin/fire/reports', {
            map
        });
    }

    async phone(req, res) {

        let {
            phone

        } = req.body;
        // let token = uniqueString();
        let newMap = new Map({
            phone,
            token
        });
        await newMap.save();

        api.VerifyLookup({
            receptor: phone,
            token: 'http://185.238.44.160:5000/' + token,
            template: "token"
        }, function (response, status) {
            console.log(response);
            console.log(status);
        });


        res.json('ok');
    }



}

module.exports = new dashboardController();