const express=require('express')
const bodyparser=require('body-parser')
const cors=require('cors')
const mongoose=require('mongoose')

const app=express();
app.use(cors());
app.use(bodyparser.json())
const customerroutes=require("./routes/customer");
const routesroute=require("./routes/route");
const bookingroute=require("./routes/booking")
app.use('/booking',bookingroute)
app.use(routesroute)
app.use(customerroutes)


const DBURL="mongodb+srv://shivani123:abcd12@tedbus.6ky58ys.mongodb.net/?appName=tedbus"
mongoose.connect(DBURL)
.then(()=> console.log("Mongodb connected"))
.catch(err=> console.error('Mongodb connection error:' ,err))
app.get('/',(req,res)=>{
    res.send('Hello , Ted bus is working')
})

const PORT= 8000
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})