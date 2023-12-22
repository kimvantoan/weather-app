const express=require('express')
const router=express.Router()
require('dotenv').config()
const axios = require('axios');
router.post('/',async(req,res)=>{
    const city=req.body.cityname
    let weathers
    let error=null
    try {
        const newAPI=await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`)
        weathers=newAPI.data
    } catch (error) {   
        weathers=null
    }
    res.render('index.ejs',{weathers,error})
})

router.get('/',(req,res)=>{
    res.render('search.ejs')
})
module.exports=router