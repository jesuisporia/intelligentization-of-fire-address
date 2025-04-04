const multer = require('multer');
const mkdirp = require('mkdirp');
const fs = require('fs');
const gm = require('gm');
const path = require('path');

const getDirImage = () => {
    let year = new Date().getFullYear();
    let month = new Date().getMonth() + 1;
    let day = new Date().getDay();

    return `./public/uploads/images/`;
}


const ImageStorage = multer.diskStorage({
    destination : (req , file , cb) => {
        let dir = getDirImage();

        // mkdirp(dir , (err) => 
        cb(null , dir)
    },
    filename : (req , file , cb) => {

        let name = Date.now() + '-' + file.originalname;
        let filePath = getDirImage() + '/' + name;
        // if(!fs.existsSync(filePath))
        //     cb(null , file.originalname);
        // else
        //     cb(null , Date.now() + '-' + file.originalname);
        cb(null , name);


                
    }
})




const uploadImage = multer({
    storage : ImageStorage,
    limits : {
        fileSize : 1024 * 1024 * 10
    }
});

module.exports = uploadImage;