const Booking = require('../models/booking');
const { Notification } = require('../models/notificationModel');
const axios = require('axios');

exports.addbooking = async (req, res) => {
  try {
    let currentStatus = 'PENDING';
    const booking = await Booking.create(req.body);
    console.log(req.body);

    await Notification.create({
      userId: req.body.customerId,
      title: 'Bus Ticket Booked',
      message: 'Your bus ticket has been successfully booked!',
      type: 'BOOKING',
    });
    console.log('notification is save');
   
   try {
  await axios.post(
    'https://api.brevo.com/v3/smtp/email',
    {
      sender: { name: "TedBus", email: process.env.EMAIL_USER },
      to: [{ email: req.body.email }],
      subject: 'Booking Confirmed - TedBus', 
      htmlContent: `<p>Hello! Your bus ticket has been successfully booked. Thank you for choosing TedBus!</p>` 
    },
    {
      headers: {
        'api-key': process.env.BREVO_API_KEY,
        'Content-Type': 'application/json'
      }
    }
  );
  console.log('Booking email sent successfully via Brevo API');
  currentStatus = 'SENT';
} catch (error) {
  console.error('Email API error:', error.response?.data || error.message);
  currentStatus = 'FAILED';
}

    await Booking.findByIdAndUpdate(booking._id, { notificationStatus: currentStatus });

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

exports.cancelBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;

    const cancelledBooking = await Booking.findByIdAndDelete(bookingId);

    if (!cancelledBooking) {
      return res.status(404).send({ success: false, message: 'Booking not found' });
    }

    await Notification.create({
      userId: cancelledBooking.customerId,
      title: 'Bus Ticket Cancelled',
      message: 'Your bus ticket has been successfully cancelled.',
      type: 'CANCELLATION',
    });
    try {
      await axios.post(
        'https://api.brevo.com/v3/smtp/email',
        {
          sender: { name: "TedBus", email: process.env.EMAIL_USER },
          to: [{ email: cancelledBooking.email }],
          subject: 'Booking Cancelled - TedBus', 
          htmlContent: `<p>Hello! Your bus ticket has been successfully cancelled. We hope to see you again!</p>` 
        },
        {
          headers: {
            'api-key': process.env.BREVO_API_KEY,
            'Content-Type': 'application/json'
          }
        }
      );
      console.log('Cancellation email sent successfully via Brevo API');
    } catch (error) {
      console.error('Email API error:', error.response?.data || error.message);
    }

    res.send({ success: true, message: 'Booking cancelled successfully' });
  } catch (error) {
    console.log('Cancellation error');
    res.status(500).send({ success: false, message: error.message });
  }
};

exports.updateBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;

    const updatedBooking = await Booking.findByIdAndUpdate(bookingId, req.body, { new: true });

    if (!updatedBooking) {
      return res.status(404).send({ success: false, message: 'Booking not found' });
    }

    try {
      await Notification.create({
        userId: updatedBooking.customerId,
        title: 'Bus Schedule Changed',
        message: `Important: The schedule for your bus trip to ${updatedBooking.departureDetails?.city || 'destination'} has been updated.`,
        type: 'SCHEDULE_CHANGE',
      });
    } catch (notifError) {
      console.log('Notification creation skipped:', notifError.message);
    }

   
let currentStatus = 'PENDING';

try {
  await axios.post(
    'https://api.brevo.com/v3/smtp/email',
    {
      sender: { 
        name: "TedBus", 
        email: process.env.EMAIL_USER 
      },
      to: [
        { email: updatedBooking.email }
      ],
      subject: 'शेड्यूल अपडेट - TedBus'
,          
      htmlContent: `<p>नमस्ते! आपकी जर्नी का शेड्यूल बदल गया है। नई सिटी: ${updatedBooking.departureDetails?.city || 'destination'}</p>` 
    },
    {
      headers: {
        'api-key': process.env.BREVO_API_KEY,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }
  );

  console.log('Update email sent successfully via Brevo API');
  currentStatus = 'SENT';
} catch (error) {
  console.error('Email API error:', error.response?.data || error.message);
  currentStatus = 'FAILED';
}

        
    

    await Booking.findByIdAndUpdate(bookingId, { notificationStatus: currentStatus });

    return res.status(200).send({
      success: true,
      message: 'Booking updated and notification sent successfully!',
      updatedBooking,
    });
  } catch (error) {
    console.error('Server error in updateBooking:', error);
    return res.status(500).send({ success: false, message: error.message });
  }
};
