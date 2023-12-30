const controller = require('./../controller');
const Post = require('./../../../models/post');
const Gallerypicture = require('./../../../models/gallerypicture');
// const fs = require('fs');
// const path = require('path');
// const sharp = require('sharp');

class galleryvideoController extends controller {
    async index(req , res) {
        try {

            let picview = await Gallerypicture.find().limit( 1 ).sort( { createdAt : -1 } )
            var idnewpic = picview[0].timestamp;
            


            // function myFunc(arg) {
            //     console.log(`arg was => ${arg}`);
            //   }
              
            //   setInterval(myFunc, 1500, 'funky');
            let allpicture = await Gallerypicture.find({});
            var allpic = allpicture.length
            // console.log(allpic)
            let page = req.query.page || 1;
            let posts = await Gallerypicture.paginate({} , { page , sort : { createdAt : -1 } , limit : 15 });
            res.render('admin/gallerypicture/index',  { title : 'همه  تصاویر' , posts , allpic });
        } catch (err) {
            next(err);
        }
    }




    
    async tableview(req,res){
        let page = req.query.page || 1;
        let posts = await Gallerypicture.paginate({} , { page , sort : { createdAt : -1 } , limit : 15 });
        res.render('admin/gallerypicture/tableview' , { title : 'نمایش جدولی تصاویر' , posts  });        

    }
    create(req , res) {
        res.render('admin/gallerypicture/create' , { title : 'افزودن تصویر به گالری تصاویر'  });        
    }
    async store(req , res , next) {
        try {
            let status = await this.validationData(req);
            if(! status) {
                if(req.file) 
                    fs.unlinkSync(req.file.path);
                return this.back(req,res);
            }
            // this.location.back(); // <-- go back to previous location on cancel

            const url = req.originalUrl;
            // const url = req.path;
            console.log(url)

            // create course
            // let images = this.imageResize(req.file);
            let { title , description , images ,timestamp} = req.body;
            var date = Date();
 

            let newPost = new Gallerypicture({
                title,
                description,
                images,        
                timestamp,        
            });

            await newPost.save();

            let picview = await Gallerypicture.find().limit( 1 ).sort( { createdAt : -1 } )

            var idnewpic = picview[0]._id;
            let newpicview = new Pictureview({
                gallerypicture: idnewpic,
                viewCount:10
            })
            await newpicview.save();

            console.log(newpicview);

            return res.redirect('/admin/gallerypicture');  
        } catch(err) {
            next(err);
        }
    }

    async edite(req,res){
        let post = await Gallerypicture.findById(req.params.id);

        res.render('admin/gallerypicture/edite' , { title : 'ویرایش تصویر' , post  });        
    }

    async destroy(req , res  , next) {
        try {
            // this.isMongoId(req.params.id);
            console.log(req.params.id)
            let gallery = await Gallerypicture.findById(req.params.id);
            if( ! gallery ) this.error('چنین دوره ای وجود ندارد' , 404);

            
            // delete Images
            // Object.values(course.images).forEach(image => fs.unlinkSync(`./public${image}`));

            // delete courses
            gallery.remove();

            return res.redirect('/admin/gallerypicture');
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new galleryvideoController();