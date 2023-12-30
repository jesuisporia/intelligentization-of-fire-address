const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');
const Product = require('./product');

const productcategorySchema = Schema({
    name : { type : String , required : true},
    description : { type : String , required : true},
    slug : { type : String , required : true},
    images : { type : Object , required : true },
    viewCount : { type : Number , default : 0 },

    parent : { type : Schema.Types.ObjectId , ref : 'Productcategory' , default : null },
} , { timestamps : true , toJSON : { virtuals : true } });

productcategorySchema.plugin(mongoosePaginate);



productcategorySchema.virtual('childs' , {
    ref : 'Productcategory',
    localField : '_id',
    foreignField : 'parent'
});



productcategorySchema.methods.productcount = function(id) {
    let product =  Product.find( { categories: { $all:  id  } } );
    let allproductes =  product.length
    // console.log(product)
    // let result = 0 ;
    // for(let i=0; i< product.length; i++){
    //     result += i
    // }
    // console.log(result + id)
    // return Response.data.map((locus) => locus);

    return allproductes
}



module.exports = mongoose.model('Productcategory' , productcategorySchema);