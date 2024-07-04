const mongoose = require('mongoose')

const RadarLocSchema = new mongoose.Schema({
    long:{
        type : String,
        require : true,
       
    },
    lat:{
        type : String,
        require : true,
       

    },
    desc:{
        type : String,
        require : true,
       

    },
    
},{timestamps : true})


module.exports = mongoose.model("RadarLoc" ,RadarLocSchema)


