const controller = require('./controller');
// const cv = require('opencv4nodejs');
const path = require('path');

const FPS = 30;
// const wCap = new cv.VideoCapture(0)
// wCap.set(cv.CAP_PROP_FRAME_WIDTH, 300)
// wCap.set(cv.CAP_PROP_FRAME_HEIGHT, 300)


class videostreamController extends controller {
  async index(req, res) {
    try {
      var io = req.app.locals.io;
      var user = req.user;
      console.log(user)
      io.on('connection', function (socket) {
        socket.on('stream', function (image) {
          socket.broadcast.emit('stream', image);
        })
      })

      // setInterval(()=>{
      //   const frame = wCap.read();
      //   const image = cv.imencode('.jpg' , frame).toString('base64');
      //   io.emit('image' , image)
      // }, 1000 / FPS)

      res.render('home/dashboard/videostrem', {
        title: 'ارتباط انلاین با سایر ایستگاه ها'
      });
    } catch (err) {
      next(err);
    }
  }



}

module.exports = new videostreamController();