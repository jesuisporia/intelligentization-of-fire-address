const controller = require('./../controllers/controller');

var shortUrl = require('node-url-shortener');



class webrtcController extends controller {


    async index (req, res) {
        res.render('home/dashboard/webrtc')
    }

    // var io = require('socket.io').listen(80);
    // io.sockets.on('connection', function (socket) {
    //   socket.emit('news', { hello: 'world' });
    //   socket.on('my other event', function (data) {
    //     console.log(data);
    //   });
    // });




}

module.exports = new webrtcController();