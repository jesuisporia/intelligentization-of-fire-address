const controller = require('../controller');
const Post = require('../../../models/post');
const Library = require('../../../models/library');
const config = require('./../../../../config')

class libraryController extends controller {
    async index(req , res , next) {
        try {
            let page = req.query.page || 1;
            var query = {};
            var options = {
                sort: {
                    createdAt: -1
                },
                page: page,
                limit: config.pagination
            };

            let posts = await Library.paginate({}, options).then(function (result) {
                return result
            });
            res.render('admin/library/index',  { title : 'همه  تصاویر کتابخانه' , posts });
        } catch (err) {
            next(err);
        }
    }

    async chart(req,res){
        res.json({

            "chartData": {

                "labels": [
        
                    "sunday",
        
                    "monday",
        
                    "tuesday",
        
                    "wednesday",
        
                    "thursday",
        
                    "friday",
        
                    "saturday"
        
                ],
        
                "thisWeek": [
        
                    20000,
        
                    14000,
        
                    12000,
        
                    15000,
        
                    18000,
        
                    19000,
        
                    22000
        
                ]
        
            }        })
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

module.exports = new libraryController();