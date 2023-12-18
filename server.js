const express=require('express')
const app=express()
const port=3000
const weatherRoute=require('./routes/weather')
const bodyParser=require('body-parser')

app.use(bodyParser.urlencoded({extended:true}))
app.use('/',weatherRoute)
app.set('view engine','ejs')
app.use(express.static('public'))

app.listen(port,()=>{
    console.log(`server run at port ${port}`);
})