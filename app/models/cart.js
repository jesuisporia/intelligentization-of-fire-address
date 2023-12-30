const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const cartSchema = Schema({
    user : { type : Schema.Types.ObjectId , ref : 'User' },
    product : { type : Schema.Types.ObjectId , ref : 'Product' , default : null },
    vip : { type : Boolean , default : false },
    price : { type : Number , required : false},
    amount : { type : Number , required : false , default: 0},
    
    payment : { type : Boolean , default : false },
} , { timestamps : true , toJSON : { virtuals : true } });

cartSchema.plugin(mongoosePaginate);


cartSchema.methods.inc = async function(field , num = 1) {
    this[field] += num;
    await this.save();
} 

module.exports = mongoose.model('Cart' , cartSchema);