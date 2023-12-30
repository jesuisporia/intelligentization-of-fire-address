const controller = require('./../controllers/controller');
const config = require('./../../../config')
var getJSON = require('get-json')
// var geoip = require('geoip-lite');
const requestIp = require('request-ip');
const publicIp = require('public-ip');
var shortUrl = require('node-url-shortener');

// var ami = new require('asterisk-manager')('5038','192.168.1.50','root','qwe123', true);


var Kavenegar = require('kavenegar');
var api = Kavenegar.KavenegarApi({
    apikey: '704859536434724B6B69436366643466767135716B773D3D'
});

const Map = require('./../../models/map');
const Fire = require('./../../models/fire');
const Hydrant = require('./../../models/hydrant');

class homeController extends controller {
    async redirect (req,res){
        res.redirect('/home')
    }

    async index (req,res){
        res.redirect('/home')
    }

    async home(req,res,next){
        try{
            console.log('ss')



            res.render('home/home')
        }catch(err){
            next(err)
        }
    }
    async hydrant (req,res,next){
        try{
            let hydrant = await Hydrant.find({});
            console.log(hydrant)
            res.render('home/dashboard/hydrant',{hydrant})
        }catch(err){
            next(err)
        }
    }
    async map(req, res) {
        let {
            lat,
            lng,
            ip
        } = req.body;

        let map = await Map.findOne({
            token: req.body.token
        });
        console.log(map)
        await map.update({ visit : true}); 
        await map.update({ lat}); 
        await map.update({ lng}); 
        await map.update({ ip}); 

        getJSON('https://map.ir/reverse/?x-api-key=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImU4YzlhNWM4N2FiMWRkNjYwZGFlOTFhNDA2YmY2MjVmODRiNzQ3ZDNlMzg3ZjU4OGVhODE0OTVmZmMyNWYwMDhiOTdiMmU4ZjEzMjIxMGEwIn0.eyJhdWQiOiI5NjQ1IiwianRpIjoiZThjOWE1Yzg3YWIxZGQ2NjBkYWU5MWE0MDZiZjYyNWY4NGI3NDdkM2UzODdmNTg4ZWE4MTQ5NWZmYzI1ZjAwOGI5N2IyZThmMTMyMjEwYTAiLCJpYXQiOjE1OTE5NTgyMjgsIm5iZiI6MTU5MTk1ODIyOCwiZXhwIjoxNTk0NTUwMjI4LCJzdWIiOiIiLCJzY29wZXMiOlsiYmFzaWMiXX0.aoZxJWSnDeyT-g9cCLnGNX2vbawUxBsRrzu11jvqiEcVKuP59mm2h8awL9gIOjvjjIO5DriOmaLKSNsD06MTSxG324jaU4WdMjb28NLD1gieAfPTn4FBxib9Okm5o3Ia0O2UqcbzLwVsPZZwB9Xguj_9maHfKrZx5ka8xGMNnfwlPvnoe6jySukY2nEftHCrM0l_qXngDiUC9hfHX9HiQaQc1--wG287k8trXcGHI6Yh4DQ5ule04fpSqSXko87gwaNEOK6O_WnQgv-3Zz8mYd3Znz9nHISYGZffKNtq7_gB-PQuBaUczqeQGZ84dK-apzaElwQyX0C6C6CHKjMQ5w&lat=' + (lat) + '&lon=' + (lng) + '', async function (error,response) {
            var firelocation = response.address;
            let rmsp = firelocation.split(" ").join("-")
            console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')

            await map.update({ address : response.address}); 


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

        var io = req.app.locals.io;
        
        io.on('connection', async (socket) => {
    
            socket.emit('temp', {temp: req});


    
        });

        return res.status(200).send({result: 'redirect', url:'/'})

        // return res.json('ok')

    }



    async index(req, res) {

        
        let map = await Map.findOne({
            token: req.params.token
        });
        var io = req.app.locals.io;

        if (map==null) {
            return res.render('home/404')

        } else if (map.visit==false) {
            let ip = await publicIp.v4()

            return res.render('home/index', {
                map,
                ip
            });
        }else if(map.visit){
            return res.json('از این توکن قبلا استفاده شده')
        }

        await map.update({ visit : true}); 












    }




}

module.exports = new homeController();