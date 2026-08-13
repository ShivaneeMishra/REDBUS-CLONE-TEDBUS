const Booking = require('../models/booking');
const { Notification } = require('../models/notificationModel');
const nodemailer = require('nodemailer');

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
    const transporter = nodemailer.createTransport({
      service: 'Brevo',
      host: 'smtp-relay.brevo.com',
      port: 587,
      secure: false,

      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized:false
      }

    });

    const mailOptions = {
      from: '"TedBus" <b55d5c001@smtp-brevo.com>',
      to: req.body.email,
      subject: 'Booking Confirmed - TedBus',
      text: `Hello! Your bus ticket has been successfully booked. Thank you for choosing TedBus!`,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
      currentStatus = 'SENT';
    } catch (emailError) {
      console.log('Email error: ', emailError.message);
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
    const transporter = nodemailer.createTransport({
      service: 'Brevo',
      host: 'smtp-relay.brevo.com',
      port: 587,
      secure:false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized:false
      }
    });

    const mailOptions = {
      from: '"TedBus" <b55d5c001@smtp-brevo.com>',
      to: cancelledBooking.email,
      subject: 'Booking Cancelled - TedBus',
      text: `Hello! Your bus ticket has been successfully cancelled. We hope to se you again!`,
    };

    transporter.sendMail(mailOptions, async (error, info) => {
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
    const maxRetries = 3;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'Brevo',
          host: 'smtp-relay.brevo.com',
          port: 587,
          secure:false,
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
          tls: {
        rejectUnauthorized:false
      }
        });

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
          from: 'TedBus <b55d5c001@smtp-brevo.com>',
          to: updatedBooking.email,
          subject: subjectText,
          text: messageText,
        };

        await transporter.sendMail(mailOptions);
        console.log(`Email sent successfully on attempt ${attempt}`);
        currentStatus = 'SENT';
        break;
      } catch (emailError) {
        console.log(`Attempt ${attempt} failed:`, emailError.message);
        if (attempt === maxRetries) {
          currentStatus = 'FAILED';
        }
      }
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
