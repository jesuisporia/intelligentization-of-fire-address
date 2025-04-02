const controller = require('./../controllers/controller');
const request = require('request-promise');
const ActivationCode = require('./../../models/activationCode');
const Payam = require('./../../models/payam');
const config = require('./../../../config')
var getJSON = require('get-json')
const Logincheck = require('./../../models/logincheck')

const Map = require('./../../models/map');
const Fire = require('./../../models/fire');
const Mapchart = require('./../../models/mapchart')
const ReportRegistration = require('./../../models/reportRegistration')

var Kavenegar = require('kavenegar');
var api = Kavenegar.KavenegarApi({
    apikey: '704859536434724B6B69436366643466767135716B773D3D'
});

class userController extends controller {

    async endofoperation(req, res) {
        let map = await Map.findOne({
            token: req.params.token
        });

        await map.update({
            approved: true
        });

        res.redirect('/dashboard')
    }
    async historylogin(req, res, next) {
        try {
            let page = req.query.page || 1;
            let historylogin = await Logincheck.paginate({userid:req.user.id} , {page , sort:{createdAt:-1},limit:5});

            res.render('home/dashboard/historylogin', {
                historylogin
            })
        } catch (err) {
            next(err)
        }
    }
    async one(req, res) {

        let map = await Map.findOne({
            station: '5ef81eb649c936237dcf84c4',
            approved: false
        }).sort({
            createdAt: -1
        });

        var lat = '';
        var lng = '';
        console.log(map)
        if (map == null) {
            lat = 0;
            lng = 0;
        } else {
            lat = map.lat;
            lng = map.lng;
        }

        const phone = req.user.phone;
        getJSON('https://map.ir/reverse/?x-api-key=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImU4YzlhNWM4N2FiMWRkNjYwZGFlOTFhNDA2YmY2MjVmODRiNzQ3ZDNlMzg3ZjU4OGVhODE0OTVmZmMyNWYwMDhiOTdiMmU4ZjEzMjIxMGEwIn0.eyJhdWQiOiI5NjQ1IiwianRpIjoiZThjOWE1Yzg3YWIxZGQ2NjBkYWU5MWE0MDZiZjYyNWY4NGI3NDdkM2UzODdmNTg4ZWE4MTQ5NWZmYzI1ZjAwOGI5N2IyZThmMTMyMjEwYTAiLCJpYXQiOjE1OTE5NTgyMjgsIm5iZiI6MTU5MTk1ODIyOCwiZXhwIjoxNTk0NTUwMjI4LCJzdWIiOiIiLCJzY29wZXMiOlsiYmFzaWMiXX0.aoZxJWSnDeyT-g9cCLnGNX2vbawUxBsRrzu11jvqiEcVKuP59mm2h8awL9gIOjvjjIO5DriOmaLKSNsD06MTSxG324jaU4WdMjb28NLD1gieAfPTn4FBxib9Okm5o3Ia0O2UqcbzLwVsPZZwB9Xguj_9maHfKrZx5ka8xGMNnfwlPvnoe6jySukY2nEftHCrM0l_qXngDiUC9hfHX9HiQaQc1--wG287k8trXcGHI6Yh4DQ5ule04fpSqSXko87gwaNEOK6O_WnQgv-3Zz8mYd3Znz9nHISYGZffKNtq7_gB-PQuBaUczqeQGZ84dK-apzaElwQyX0C6C6CHKjMQ5w&lat=' + (lat) + '&lon=' + (lng) + '', async function (error, response) {
            var firelocation = response.address;
            let rmsp = firelocation.split(" ").join("-")

            // api.VerifyLookup({
            //     receptor: phone,
            //     token: rmsp,
            //     template: "fire"
            // }, function (response, status) {
            //     console.log(response);
            //     console.log(status);
            // });


            let newFire = new Fire({
                address: response.address,
                postal_address: response.postal_address,
                address_compact: response.address_compact,
                primary: response.primary,
                name: response.name,
                poi: response.poi,
                country: response.country,
                province: response.province,
                county: response.county,
                district: response.district,
                rural_district: response.rural_district,
                city: response.city,
                village: response.village,
                region: response.region,
                neighbourhood: response.neighbourhood,
                last: response.last,
                plaque: response.plaque,
                postal_code: response.postal_code,

            });

            console.log('save')
            await newFire.save();

        })


        res.render('home/dashboard/one', {
            title: 'ایستگاه یک',
            map

        })

    }

    async seven(req, res) {



        let map = await Map.findOne({
            station: '5ef81ecb49c936237dcf84c6',
            approved: false
        }).sort({
            createdAt: -1
        });

        var lat = '';
        var lng = '';
        console.log(map)
        if (map == null) {
            lat = 0;
            lng = 0;
        } else {
            lat = map.lat;
            lng = map.lng;
        }





        const phone = req.user.phone;
        getJSON('https://map.ir/reverse/?x-api-key=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImU4YzlhNWM4N2FiMWRkNjYwZGFlOTFhNDA2YmY2MjVmODRiNzQ3ZDNlMzg3ZjU4OGVhODE0OTVmZmMyNWYwMDhiOTdiMmU4ZjEzMjIxMGEwIn0.eyJhdWQiOiI5NjQ1IiwianRpIjoiZThjOWE1Yzg3YWIxZGQ2NjBkYWU5MWE0MDZiZjYyNWY4NGI3NDdkM2UzODdmNTg4ZWE4MTQ5NWZmYzI1ZjAwOGI5N2IyZThmMTMyMjEwYTAiLCJpYXQiOjE1OTE5NTgyMjgsIm5iZiI6MTU5MTk1ODIyOCwiZXhwIjoxNTk0NTUwMjI4LCJzdWIiOiIiLCJzY29wZXMiOlsiYmFzaWMiXX0.aoZxJWSnDeyT-g9cCLnGNX2vbawUxBsRrzu11jvqiEcVKuP59mm2h8awL9gIOjvjjIO5DriOmaLKSNsD06MTSxG324jaU4WdMjb28NLD1gieAfPTn4FBxib9Okm5o3Ia0O2UqcbzLwVsPZZwB9Xguj_9maHfKrZx5ka8xGMNnfwlPvnoe6jySukY2nEftHCrM0l_qXngDiUC9hfHX9HiQaQc1--wG287k8trXcGHI6Yh4DQ5ule04fpSqSXko87gwaNEOK6O_WnQgv-3Zz8mYd3Znz9nHISYGZffKNtq7_gB-PQuBaUczqeQGZ84dK-apzaElwQyX0C6C6CHKjMQ5w&lat=' + (lat) + '&lon=' + (lng) + '', async function (error, response) {
            console.log(req.body);
            console.log(response.address);
            var firelocation = response.address;
            let rmsp = firelocation.split(" ").join("-")

            // api.VerifyLookup({
            //     receptor: phone,
            //     token: rmsp,
            //     template: "fire"
            // }, function (response, status) {
            //     console.log(response);
            //     console.log(status);
            // });


            let newFire = new Fire({
                address: response.address,
                postal_address: response.postal_address,
                address_compact: response.address_compact,
                primary: response.primary,
                name: response.name,
                poi: response.poi,
                country: response.country,
                province: response.province,
                county: response.county,
                district: response.district,
                rural_district: response.rural_district,
                city: response.city,
                village: response.village,
                region: response.region,
                neighbourhood: response.neighbourhood,
                last: response.last,
                plaque: response.plaque,
                postal_code: response.postal_code,

            });

            console.log('save')
            await newFire.save();

        })


        res.render('home/dashboard/seven', {
            title: 'ایستگاه هفت',
            map

        })

    }
    async dashboard(req, res) {

        let fire = await Fire.find({}).sort({
            createdAt: -1
        }).limit(1);
        let map = await Map.find({}).sort({
            createdAt: -1
        }).limit(1);
        let mapchart = await Mapchart.find({}).sort({
            createdAt: -1
        });
        let reportRegistration = await ReportRegistration.find({
            // userid: req.user.id
        }).sort({
            createdAt: -1
        });

        let numberreport = reportRegistration.length;

        const io = req.app.locals.io;
        // console.log(io)
        io.on('connection', (socket) => {
            console.log('a user connected');

            socket.on('new fire', function (data) {
                console.log(data)
            });
            socket.on('disconnect', () => {
                console.log('user disconnected');
            });
        });

        res.render('home/dashboard/index', {
            title: 'پنل کاربری',
            fire,
            numberreport,
            map

        })
    }


}

module.exports = new userController();