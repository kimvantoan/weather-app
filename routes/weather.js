const express=require('express')
const router=express.Router()
require('dotenv').config()
router.get('/',(req,res)=>{
    res.render('index.ejs',{
        city:null,
        temp:null,
        icon:null,
        desc:null,
        wind:null,})
})

router.post('/',async(req,res)=>{
    const city=req.body.cityname
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`
    try {
      await fetch(url)
        .then(res=>res.json())
        .then(data=>{
            if(data.message==='city not found'){
                res.render('index',{
                    city:data.message,
                    temp:null,
                    desc:null,
                    icon:null,
                    wind:null,
                })
            }else{
                const city=data.name;
                const temp=(data.main.temp-32)*(5/9);
                const desc=data.weather[0].description;
                const wind=data.wind.speed
                const icon=data.weather[0].icon
                res.render('index',{city,desc,wind,temp,icon})
            }
        }) 
    } catch (error) {
        res.render('index',{
            city:"something wrong",
            temp:null,
            desc:null,
            icon:null,
            wind:null
        })
    }
})
module.exports=router