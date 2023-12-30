const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');
 
const productSchema = Schema({
    user : { type : Schema.Types.Object , ref : 'User'},
    categories : [{ type : Schema.Types.ObjectId , ref : 'Productcategory'}],
    approved : { type : Boolean , default : true },
    canonical : { type : String , required : false },
    title : { type : String , required : true },
    slug : { type : String , required : true },
    body : { type : String , required : true },
    TechnicalSpecifications : { type : String , required : false },
    metaDescription : { type : String , required : true },
    titleSeo : { type : String , required : true },
    keySeo : { type : String , required : true },
    timestamp : { type : String , required : false },
    type : { type : Number ,  default : 0 },
    condition : { type : Number ,  default : 0 },
    price : { type : String , required : false },
    cash : { type : String , required : false },
    off : { type : Number , default : 0 },
    images : { type : Object , required : true },
    gallery : [{ type : Object , required : false }],
    thumb : [{ type : Object , required : false }],
    viewCount : { type : Number , default : 0 },
    viewrealCount : { type : Number , default : 0 },
    viewpointCount : { type : Number , default : 0 },
} , { timestamps : true , toJSON : { virtuals : true } });

productSchema.plugin(mongoosePaginate);

productSchema.methods.typeToPersian = function() {
    switch (this.type) {
        case 'cash':
                return 'نقدی'
            break;
        case 'vip':
            return 'اعضای ویژه'
        break;    
        default:
            return 'رایگان'    
            break;
    }
}

productSchema.methods.path = function() {
    return `/Post/${this.slug}`;
}


productSchema.methods.inc = async function(field , num = 1) {
    this[field] += num;
    await this.save();
} 


productSchema.methods.dic = async function(field , num = 1) {
    this[field] -= num;
    await this.save();
} 


productSchema.virtual('viewpoint' , {
    ref : 'Viewpoint',
    localField : '_id',
    foreignField : 'product'
})


productSchema.virtual('history' , {
    ref : 'Product',
    localField : '_id',
    foreignField : 'productid'
})

productSchema.virtual('comments' , {
    ref : 'Viewpoint',
    localField : '_id',
    foreignField : 'product'
})


module.exports = mongoose.model('Product' , productSchema);