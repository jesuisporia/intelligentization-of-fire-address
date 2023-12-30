const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const productviewSchema = Schema({

    productid : { type : Schema.Types.ObjectId , ref : 'Product'},
    viewCount : { type : Number , default : 0 },

} , { timestamps : true , toJSON : { virtuals : true } });

productviewSchema.plugin(mongoosePaginate);




module.exports = mongoose.model('Productview' , productviewSchema);