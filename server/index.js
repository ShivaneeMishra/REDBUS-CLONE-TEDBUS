require('dotenv').config();
const express=require('express')
const bodyparser=require('body-parser')
const cors=require('cors')
const mongoose=require('mongoose')


const app=express();
app.use(cors({ origin: ['https://helpful-dodol-6eed54.netlify.app', 'http://localhost:4200'],
  credentials: true
 }));
 
app.use(bodyparser.json())
app.use('uploads',express.static('uploads'))
const customerroutes=require("./routes/customer");
const routesroute=require("./routes/route");
const bookingroute=require("./routes/booking");
const communitypostroutes=require("./routes/communitypost");
const topicsroutes=require("./routes/topics");
const forumRoutesroutes=require("./routes/forumRoutes");
const replyRoutesroutes=require('./routes/replyRoutes');
const notificationRoutesroutes=require('./routes/notificationRoutes');
const routePlannerRoutes =require('./routes/routeplannerRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
app.use('/reviewRoutes', reviewRoutes);
app.use('/routeplannerRoutes',routePlannerRoutes)
app.use('/notificationRoutes',notificationRoutesroutes) 
app.use('/replyRoutes',replyRoutesroutes)
app.use('/forumRoutes',forumRoutesroutes)
app.use('/topics',topicsroutes)
app.use('/communitypost',communitypostroutes)
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

const PORT=process.env.PORT || 8000;
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})

const cron = require('node-cron');
const Booking = require('./models/booking');
const { Notification } = require('./models/notificationModel');
const nodemailer = require('nodemailer');


cron.schedule('0 8 * * *', async () => {
  console.log('Checking for upcoming journey reminders...');
  try {
    const today = new Date().toISOString().split('T')[0];
    console.log('Target date:', today);
    
    
    const bookings = await Booking.find({ 'departureDetails.date': today });
    console.log('Total bookings found for today:',bookings.length);

    for (const booking of bookings) {
      
      await Notification.create({
        userId: booking.customerId ,
        title: 'Journey Reminder',
        message: `Reminder: Your bus trip from ${booking.departureDetails?.city} to ${booking.arrivalDetails?.city} is scheduled for today!`,
        type: 'REMINDER'
      });

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      const mailOptions = {
        from: '"TedBus" <shivaneem98@gmail.com>',
        to: booking.email,
        subject: 'Upcoming Journey Reminder - TedBus',
        text: `Hello! This is a friendly reminder that your bus trip from ${booking.departureDetails?.city} to ${booking.arrivalDetails?.city} is today. Have a safe journey!`
      };

      await transporter.sendMail(mailOptions);
      console.log(`Reminder email sent to ${booking.email}`);
    }
  } catch (error) {
    console.error('Reminder cron error:', error);
  }
});