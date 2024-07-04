const router = require('express').Router()
const User = require('../model/User')
var bcrypt = require('bcryptjs');


router.get("/register", async (req,res) =>{

try {
    
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password ,salt)
    
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.hashPassword
    })

    const user = await newUser.save()
    res.status(200).json(user._id)
} catch (error) {
    res.status(500).json(error)
}

})


router.post("/login", async (req,res) => {
    try {
        const user = await  User.findOne({username:req.body.username})
        !user &&  res.status(400).json("Wrong username or password")

        const validPassword =  bcrypt.compare( req.body.password ,user.password  )
        !validPassword &&  res.status(400).json("Wrong username or password")


        res.status(200).json({_id: user._id , username: username})
    } catch (error) {
        res.status(500).json(error)

    }
})

module.exports = router