const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const uniqueString = require('unique-string')
const mongoosePaginate = require('mongoose-paginate');

const stationSchema = Schema({
    name : { type : String , required : false },
    address : { type : String , required : false },
    phone : { type : String , required : false },
    email : { type : String , unique : true  ,required : true},
    lat : { type : String , required : false},
    lng : { type : String , required : false},
    admin : { type : Boolean ,  default : 0 },
    password : { type : String ,  required : true },
    // roles : [{ type : Schema.Types.ObjectId , ref : 'Role'}],
} , { timestamps : true , toJSON : { virtuals : true } });

stationSchema.plugin(mongoosePaginate);


// stationSchema.pre('save' , function(next) {
//     let salt = bcrypt.genSaltSync(15);
//     let hash = bcrypt.hashSync(this.password , salt);
//     this.password = hash;
//     console.log(this.password)
//     next();
// });

// stationSchema.pre('findOneAndUpdate' , function(next) {
//     let salt = bcrypt.genSaltSync(15);
//     let hash = bcrypt.hashSync(this.getUpdate().$set.password , salt);

//     this.getUpdate().$set.password = hash;
//     next();
// });

// stationSchema.methods.comparePassword = function(password) {
//     return bcrypt.compareSync(password , this.password);
// }







module.exports = mongoose.model('Station' , stationSchema);