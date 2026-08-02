const Booking = require('../models/booking');
const { Notification } = require('../models/notificationModel');
const nodemailer = require('nodemailer');

exports.addbooking = async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    console.log(req.body);

    await Notification.create({
      userId: req.body.customerId || '6a42602ca6e2df2097654c19',
      title: 'Bus Ticket Booked',
      message: 'Your bus ticket has been successfully booked!',
      type: 'BOOKING',
    });
    console.log('notification is save');
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'shivaneem98@gmail.com', // यहाँ अपनी जीमेल आईडी लिखें
        pass: 'jhkw mdzs rlta fqch', // यहाँ अपना Gmail App Password लिखें (यह कैसे बनाना है, मैं नीचे बता रहा हूँ)
      },
    });

    // (b) ईमेल क्या भेजना है, वह सेट करें
    const mailOptions = {
      from: '"TedBus" <shivaneem98@gmail.com>',
      to: req.body.email || 'shivanee03mishra@gmail.com', // जिसे ईमेल भेजना है (Customer Email)
      subject: 'Booking Confirmed - TedBus',
      text: `Hello! Your bus ticket has been successfully booked. Thank you for choosing TedBus!`,
    };

    // (c) ईमेल भेज दें!
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Email error: ', error);
      } else {
        console.log('Email sent successfully: ' + info.response);
      }
    });

    res.send(booking);
  } catch (error) {
    console.log('notification is not save');
    res.status(500).send({ success: false, message: error.message });
  }
};

exports.getBooking = async (req, res) => {
  let { id } = req.params;
  const booking = await Booking.find().lean().exec();
  let filteredBookings = booking.filter((booking) => booking.customerId.toString() == id);
  res.send(filteredBookings);
};
// टिकट कैंसल करने और नोटिफिकेशन सेव करने का फंक्शन
exports.cancelBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;

    // डेटाबेस से बुकिंग ढूंढकर डिलीट करें
    const cancelledBooking = await Booking.findByIdAndDelete(bookingId);

    if (!cancelledBooking) {
      return res.status(404).send({ success: false, message: 'Booking not found' });
    }

    // बुकिंग कैंसल होते ही नोटिफिकेशन हिस्ट्री में सेव करें
    await Notification.create({
      userId: cancelledBooking.customerId || '6a42602ca6e2df2097654c19',
      title: 'Bus Ticket Cancelled',
      message: 'Your bus ticket has been successfully cancelled.',
      type: 'CANCELLATION',
    });
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'shivaneem98@gmail.com', // यहाँ अपनी जीमेल आईडी लिखें
        pass: 'jhkw mdzs rlta fqch', // यहाँ अपना Gmail App Password लिखें (यह कैसे बनाना है, मैं नीचे बता रहा हूँ)
      },
    });
    // (b) ईमेल क्या भेजना है, वह सेट करें
    const mailOptions = {
      from: '"TedBus" <shivaneem98@gmail.com>',
      to: cancelledBooking.email || 'shivanee03mishra@gmail.com', // जिसे ईमेल भेजना है (Customer Email)
      subject: 'Booking Cancelled - TedBus',
      text: `Hello! Your bus ticket has been successfully cancelled. We hope to se you again!`,
    };

    // (c) ईमेल भेज दें!
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Email error: ', error);
      } else {
        console.log('Email sent successfully: ' + info.response);
      }
    });

    res.status(200).send({ success: true, message: 'Booking cancelled successfully!' });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

exports.updateBooking = async (req, res) => {
    try {
        const bookingId = req.params.id;
        
        // 1. डेटाबेस में अपडेट करें
        const updatedBooking = await Booking.findByIdAndUpdate(bookingId, req.body, { new: true });
        
        if (!updatedBooking) {
            return res.status(404).send({ success: false, message: 'Booking not found' });
        }

        // 2. नोटिफिकेशन बनाएं (सुरक्षित तरीके से)
        try {
            await Notification.create({
                userId: updatedBooking.customerId || '6a42602ca6e2df2097654c19',
                title: 'Bus Schedule Changed',
                message: `Important: The schedule for your bus trip to ${updatedBooking.departureDetails?.city || 'destination'} has been updated.`,
                type: 'SCHEDULE_CHANGE',
            });
        } catch (notifError) {
            console.log('Notification creation skipped:', notifError.message);
        }

       // 3. ईमेल भेजें (Retry मैकेनिज्म के साथ)
let currentStatus = 'PENDING';
const maxRetries = 3;

for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'shivaneem98@gmail.com',
                pass: 'jhkw mdzs rlta fqch'
            }
        });
        // यूज़र की भाषा चेक करें (लोकलाइजेशन सपोर्ट)
const userLang = req.body.language || 'en'; 

let subjectText = '';
let messageText = '';

if (userLang === 'hi') {
    subjectText = 'शेड्यूल अपडेट - TedBus';
    messageText = `नमस्ते! आपकी जर्नी का शेड्यूल बदल गया है। नई सिटी: ${updatedBooking.departureDetails?.city || 'destination'}`;
} else {
    subjectText = 'Schedule Update - TedBus';
    messageText = `Hello! There is a change in the schedule of your upcoming bus journey to ${updatedBooking.departureDetails?.city || 'destination'}.`;
}

        const mailOptions = {
            from: 'TedBus <shivaneem98@gmail.com>',
            to: updatedBooking.email || 'shivanee83mishra@gmail.com',
            subject: subjectText,
            text: messageText
        };

        await transporter.sendMail(mailOptions);
        console.log(`Email sent successfully on attempt ${attempt}`);
        currentStatus = 'SENT';
        break; // अगर मेल चला गया, तो लूप से बाहर आ जाएं

    } catch (emailError) {
        console.log(`Attempt ${attempt} failed:`, emailError.message);
        if (attempt === maxRetries) {
            currentStatus = 'FAILED'; // अगर तीनों बार फेल हो गया
        }
    }
}

// अंत में डेटाबेस में सही स्टेटस सेव करें
await Booking.findByIdAndUpdate(bookingId, { notificationStatus: currentStatus });

        // 4. अंत में क्लाइंट को सफलता का संदेश भेजें
        return res.status(200).send({ 
            success: true, 
            message: 'Booking updated and notification sent successfully!', 
            updatedBooking 
        });

    } catch (error) {
        console.error('Server error in updateBooking:', error);
        return res.status(500).send({ success: false, message: error.message });
    }
};