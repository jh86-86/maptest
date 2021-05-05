const mongoose= require('mongoose');

const Schema= mongoose.Schema;

const routeSchema= new Schema({
    route: {type: Array, required: true},
    distance:{type:Number, required:true},
    homePostcode:{type:Number, required:true},
    otherPostcode:{type:Number, required:true},

   
}, {
    timestamps: true,
});

const Route= mongoose.model('route',routeSchema);

module.exports =Route;