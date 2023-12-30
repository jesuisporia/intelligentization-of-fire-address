const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');
const moment = require('moment-jalaali');
moment.loadPersian({usePersianDigits: true})


const reportRegistrationSchema = Schema({
    userid : { type : Schema.Types.ObjectId , ref : 'User'},
    fireman : [{ type : Schema.Types.ObjectId , ref : 'User'}],
    name : { type : String , required : false },
    incidenttime : { type : String , required : false },
    timetoannouncetheaccident : { type : String , required : false },
    numberofdispatchofficers : { type : String , required : false },
    timetostarttheoperation : { type : String , required : false },
    timetoendtheoperation : { type : String , required : false },
    durationofoperation : { type : String , required : false },
    accidentaddress : { type : String , required : false },

    informant: { type : String , required : false }, 
    receivernews: { type : String , required : false },
    whatLastvisitdate: { type : String , required : false },
    

    Newsmethod: { type : String , required : false },

    Operatingstation: { type : String , required : false },
    
    Thelocationoftheaccident: { type : String , required : false },
    
    Numberoffloors: { type : String , required : false },
    
    buildingtype: { type : String , required : false },
    
    Theownername: { type : String , required : false },
    
    Tenantname: { type : String , required : false },
    
    Typeofaccident: { type : String , required : false },
    
    fire: { type : String , required : false },
    
    Otherevents: { type : String , required : false },
    
    Explainthecausesoftheaccident: { type : String , required : false },
    
    Explaintheinitialstepstaken: { type : String , required : false },
    
    DescriptionofOperation: { type : String , required : false },
    
    Descriptionofproblems: { type : String , required : false },
    
    Atmosphericconditions: { type : String , required : false },
    
    Presenceofcooperationofotherstations: { type : String , required : false },
    
    Accidentprofile: { type : String , required : false },
    
    Equipmentused: { type : String , required : false },
    
    Havethesitebeenvisitedbefore: { type : String , required : false },
    Winddirection: { type : String , required : false },
    Presenceandcooperationofotherstationscentersandorganizations: { type : String , required : false },
    
    windspeed: { type : String , required : false },
    temperature: { type : String , required : false },
    relativehumidity: { type : String , required : false },
    Firetruck: { type : String , required : false },
    Carcarryingequipment: { type : String , required : false },
    meterladdercarthree: { type : String , required : false },
    meterladdercarfive: { type : String , required : false },
    Hydrauliclift: { type : String , required : false },
    Carrescue: { type : String , required : false },
    Ambulance: { type : String , required : false },
    Pipe: { type : String , required : false },
    Headpipe: { type : String , required : false },
    Exporter: { type : String , required : false },
    Burntclothing: { type : String , required : false },
    Powder: { type : String , required : false },
    Portablemotorpump: { type : String , required : false },
    Respiratorysystem: { type : String , required : false },
    Brushingmachine: { type : String , required : false },
    inputRelatedService: { type : String , required : false },
    
    Electricgenerator: { type : String , required : false },
    Cuffs: { type : String , required : false },
    Water: { type : String , required : false },
    other: { type : String , required : false },
    
    
    Visitorname: { type : String , required : false },
    
    Lastvisitdate: { type : String , required : false },
    



    visited : { type : Boolean , default : false },
} , { timestamps : true , toJSON : { virtuals : true } });


// reportRegistrationSchema.methods.typetopersian = function(){
//     var str = this.createdAt;
//     var resultstr = str.toISOString().substring(0, 9);
//     console.log(resultstr);
//     return moment(resultstr);
// }

reportRegistrationSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('ReportRegistration' , reportRegistrationSchema);