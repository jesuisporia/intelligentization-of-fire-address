const controller = require('./../controllers/controller');
const config = require('./../../../config')
var getJSON = require('get-json')
// var geoip = require('geoip-lite');
const requestIp = require('request-ip');
const publicIp = require('public-ip');
var shortUrl = require('node-url-shortener');

// var url = require('url');


var Kavenegar = require('kavenegar');
var api = Kavenegar.KavenegarApi({
    apikey: '704859536434724B6B69436366643466767135716B773D3D'
});

const Map = require('./../../models/map');
const Fire = require('./../../models/fire');

class tiketController extends controller {


    async index (req, res) {
        res.render('home/dashboard/tiket')
    }

    async create(req,res,next){
        try{
            res.render('home/dashboard/tiket/create')
        }catch(err){
            next(err);
        }
    }
    




}

module.exports = new tiketController();