const controller = require('./../controller');
const Hydrant = require('./../../../models/hydrant');
var getJSON = require('get-json');

class widgetController extends controller {
    async index(req, res) {
        try {

            res.render('gis/index', {
                title: 'پنل gis سازمان آتش نشانی'
            });
        } catch (err) {
            next(err);
        }
    }



    async live(req, res) {
        try {

            res.render('gis/live', {
                title: 'پنل gis سازمان آتش نشانی'
            });
        } catch (err) {
            next(err);
        }
    }



    async info(req, res) {
        try {

            res.render('gis/info', {
                title: 'پنل gis سازمان آتش نشانی'
            });
        } catch (err) {
            next(err);
        }
    }



    async information(req, res) {
        try {

            res.render('gis/information', {
                title: 'پنل gis سازمان آتش نشانی'
            });
        } catch (err) {
            next(err);
        }
    }



    async hydrant(req, res) {
        try {
            let hydrants = await Hydrant.find({}).sort({createdAt:-1});
            res.render('gis/hydrant', {
                hydrants,
                title: 'پنل gis سازمان آتش نشانی'
            });
        } catch (err) {
            next(err);
        }
    }



    async store(req, res, next) {
        try {



            let lat = req.body.lat
            let lng = req.body.lng

            var address = getJSON('https://map.ir/reverse/?x-api-key=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImU4YzlhNWM4N2FiMWRkNjYwZGFlOTFhNDA2YmY2MjVmODRiNzQ3ZDNlMzg3ZjU4OGVhODE0OTVmZmMyNWYwMDhiOTdiMmU4ZjEzMjIxMGEwIn0.eyJhdWQiOiI5NjQ1IiwianRpIjoiZThjOWE1Yzg3YWIxZGQ2NjBkYWU5MWE0MDZiZjYyNWY4NGI3NDdkM2UzODdmNTg4ZWE4MTQ5NWZmYzI1ZjAwOGI5N2IyZThmMTMyMjEwYTAiLCJpYXQiOjE1OTE5NTgyMjgsIm5iZiI6MTU5MTk1ODIyOCwiZXhwIjoxNTk0NTUwMjI4LCJzdWIiOiIiLCJzY29wZXMiOlsiYmFzaWMiXX0.aoZxJWSnDeyT-g9cCLnGNX2vbawUxBsRrzu11jvqiEcVKuP59mm2h8awL9gIOjvjjIO5DriOmaLKSNsD06MTSxG324jaU4WdMjb28NLD1gieAfPTn4FBxib9Okm5o3Ia0O2UqcbzLwVsPZZwB9Xguj_9maHfKrZx5ka8xGMNnfwlPvnoe6jySukY2nEftHCrM0l_qXngDiUC9hfHX9HiQaQc1--wG287k8trXcGHI6Yh4DQ5ule04fpSqSXko87gwaNEOK6O_WnQgv-3Zz8mYd3Znz9nHISYGZffKNtq7_gB-PQuBaUczqeQGZ84dK-apzaElwQyX0C6C6CHKjMQ5w&lat=' + (lng) + '&lon=' + (lat) + '', async function (error, response) {
            let newHydrant = new Hydrant({
                    address: response.address,
                    latlng: {
                        lat: lat,
                        lng: lng
                    }

                });

                await newHydrant.save(err => {
                    console.log(err)
                });
            })
           
            res.redirect('/admin/gis/hydrant')
        } catch (err) {
            next(err);
        }
    }



}

module.exports = new widgetController();