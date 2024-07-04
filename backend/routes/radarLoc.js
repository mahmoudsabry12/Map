const router = require('express').Router()
const RadarLoc = require('../model/Radarloc')

router.post("/", async (req,res)=>{
    // const newRadarLoc = new RadarLoc(req.body)

    try {

        const newRadarLoc = new RadarLoc({
            long: req.body.long,
            lat: req.body.lat,
            desc: req.body.desc
        })
        const savedRadarLoc = await newRadarLoc.save();
        res.status(200).json(savedRadarLoc)
    } catch (error) {
        res.status(500).json(error)   
    }
})


router.get('/' ,async (req,res) =>{
    try {
        const RadarLocs = await RadarLoc.find()
        res.status(200).json(RadarLocs)   
    } catch (error) {
        res.status(500).json(error)   
    }
})

module.exports = router